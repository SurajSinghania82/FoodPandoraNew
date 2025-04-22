const express = require("express")
const { Op, fn, col, literal } = require("sequelize")
const { TokenUsage, User } = require("../models")
const { authenticateToken, isAdmin } = require("../middleware/auth")

const router = express.Router()

// Get token usage for current user
router.get("/me", authenticateToken, async (req, res) => {
  try {
    // Get date range from query params
    const startDate = req.query.startDate
      ? new Date(req.query.startDate)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Default to last 30 days
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date()

    // Ensure end date is set to end of day
    endDate.setHours(23, 59, 59, 999)

    // Get token usage
    const usage = await TokenUsage.findAll({
      where: {
        userId: req.user.id,
        timestamp: { [Op.between]: [startDate, endDate] },
      },
      order: [["timestamp", "DESC"]],
    })

    // Calculate total usage
    const totalUsage = usage.reduce((sum, record) => sum + record.tokensUsed, 0)

    // Group by day for chart data
    const dailyUsage = await TokenUsage.findAll({
      attributes: [
        [fn("date_trunc", "day", col("timestamp")), "date"],
        [fn("sum", col("tokensUsed")), "total"],
      ],
      where: {
        userId: req.user.id,
        timestamp: { [Op.between]: [startDate, endDate] },
      },
      group: [fn("date_trunc", "day", col("timestamp"))],
      order: [[fn("date_trunc", "day", col("timestamp")), "ASC"]],
      raw: true,
    })

    res.json({
      data: {
        usage,
        totalUsage,
        dailyUsage,
        remaining: req.user.tokenLimit - req.user.tokensUsed,
        limit: req.user.tokenLimit,
      },
    })
  } catch (error) {
    console.error("Get token usage error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get token usage for all users (admin only)
router.get("/all", authenticateToken, isAdmin, async (req, res) => {
  try {
    // Get date range from query params
    const startDate = req.query.startDate
      ? new Date(req.query.startDate)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Default to last 30 days
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date()

    // Ensure end date is set to end of day
    endDate.setHours(23, 59, 59, 999)

    // Group by user and day
    const usageByUser = await TokenUsage.findAll({
      attributes: [
        [fn("date_trunc", "day", col("timestamp")), "date"],
        "userId",
        [fn("sum", col("tokensUsed")), "total"],
      ],
      where: {
        timestamp: { [Op.between]: [startDate, endDate] },
      },
      group: [fn("date_trunc", "day", col("timestamp")), "userId"],
      order: [[fn("date_trunc", "day", col("timestamp")), "ASC"]],
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
      raw: true,
      nest: true,
    })

    // Get total usage by user
    const totalByUser = await TokenUsage.findAll({
      attributes: ["userId", [fn("sum", col("tokensUsed")), "total"]],
      where: {
        timestamp: { [Op.between]: [startDate, endDate] },
      },
      group: ["userId"],
      include: [
        {
          model: User,
          attributes: ["name", "email", "tokenLimit", "tokensUsed"],
        },
      ],
      order: [[fn("sum", col("tokensUsed")), "DESC"]],
      raw: true,
      nest: true,
    })

    // Format the response
    const formattedTotalByUser = totalByUser.map((item) => ({
      userId: item.userId,
      userName: item.User.name,
      userEmail: item.User.email,
      total: Number.parseInt(item.total),
      limit: item.User.tokenLimit,
      remaining: item.User.tokenLimit - item.User.tokensUsed,
    }))

    res.json({
      data: {
        usageByUser,
        totalByUser: formattedTotalByUser,
      },
    })
  } catch (error) {
    console.error("Get all token usage error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get token usage for specific user (admin only)
router.get("/user/:userId", authenticateToken, isAdmin, async (req, res) => {
  try {
    // Get date range from query params
    const startDate = req.query.startDate
      ? new Date(req.query.startDate)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Default to last 30 days
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date()

    // Ensure end date is set to end of day
    endDate.setHours(23, 59, 59, 999)

    // Get token usage
    const usage = await TokenUsage.findAll({
      where: {
        userId: req.params.userId,
        timestamp: { [Op.between]: [startDate, endDate] },
      },
      order: [["timestamp", "DESC"]],
    })

    // Calculate total usage
    const totalUsage = usage.reduce((sum, record) => sum + record.tokensUsed, 0)

    // Group by day for chart data
    const dailyUsage = await TokenUsage.findAll({
      attributes: [
        [fn("date_trunc", "day", col("timestamp")), "date"],
        [fn("sum", col("tokensUsed")), "total"],
      ],
      where: {
        userId: req.params.userId,
        timestamp: { [Op.between]: [startDate, endDate] },
      },
      group: [fn("date_trunc", "day", col("timestamp"))],
      order: [[fn("date_trunc", "day", col("timestamp")), "ASC"]],
      raw: true,
    })

    res.json({
      data: {
        usage,
        totalUsage,
        dailyUsage,
      },
    })
  } catch (error) {
    console.error("Get user token usage error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
