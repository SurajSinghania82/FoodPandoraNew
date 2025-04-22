const express = require("express")
const { Op } = require("sequelize")
const { User } = require("../models")
const { authenticateToken, isAdmin } = require("../middleware/auth")

const router = express.Router()

// Get all users (admin only)
router.get("/", authenticateToken, isAdmin, async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    // Build query
    const where = {}

    // Search
    if (req.query.search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${req.query.search}%` } },
        { email: { [Op.iLike]: `%${req.query.search}%` } },
      ]
    }

    // Filter by role
    if (req.query.role) {
      where.role = req.query.role
    }

    // Filter by active status
    if (req.query.active !== undefined) {
      where.active = req.query.active === "true"
    }

    // Execute query with pagination
    const { rows: users, count: total } = await User.findAndCountAll({
      where,
      attributes: { exclude: ["password"] },
      offset,
      limit,
    })

    res.json({
      data: users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get users error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get user by ID (admin or self)
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    // Check if user is requesting their own data or is an admin
    if (req.user.id.toString() !== req.params.id && req.user.role !== "Admin") {
      return res.status(403).json({ error: "Forbidden. You can only access your own data." })
    }

    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json({
      data: user,
    })
  } catch (error) {
    console.error("Get user error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Create new user (admin only)
router.post("/", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, email, password, role, tokenLimit, active } = req.body

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" })
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" })
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role: role || "User",
      tokenLimit: tokenLimit || 5000,
      tokensUsed: 0,
      active: active !== undefined ? active : true,
    })

    // Remove password from response
    const userResponse = user.toJSON()
    delete userResponse.password

    res.status(201).json({ data: userResponse })
  } catch (error) {
    console.error("Create user error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Update user (admin or self)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    // Check if user is updating their own data or is an admin
    if (req.user.id.toString() !== req.params.id && req.user.role !== "Admin") {
      return res.status(403).json({ error: "Forbidden. You can only update your own data." })
    }

    // If not admin, restrict fields that can be updated
    let updateData = { ...req.body }
    if (req.user.role !== "Admin") {
      // Regular users can only update their name and password
      updateData = {
        name: req.body.name,
        password: req.body.password,
      }
    }

    // If updating email, check if it already exists
    if (updateData.email) {
      const existingUser = await User.findOne({ where: { email: updateData.email } })
      if (existingUser && existingUser.id.toString() !== req.params.id) {
        return res.status(409).json({ error: "Email already exists" })
      }
    }

    const user = await User.findByPk(req.params.id)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    await user.update(updateData)

    // Remove password from response
    const userResponse = user.toJSON()
    delete userResponse.password

    res.json({
      data: userResponse,
    })
  } catch (error) {
    console.error("Update user error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Delete user (admin only)
router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    await user.destroy()

    res.json({
      success: true,
    })
  } catch (error) {
    console.error("Delete user error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Reset user's token usage (admin only)
router.post("/:id/reset-tokens", authenticateToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    await user.update({ tokensUsed: 0 })

    // Remove password from response
    const userResponse = user.toJSON()
    delete userResponse.password

    res.json({
      data: userResponse,
      message: "Token usage reset successfully",
    })
  } catch (error) {
    console.error("Reset tokens error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Update user's token limit (admin only)
router.post("/:id/token-limit", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { tokenLimit } = req.body

    if (!tokenLimit || typeof tokenLimit !== "number" || tokenLimit < 0) {
      return res.status(400).json({ error: "Valid token limit is required" })
    }

    const user = await User.findByPk(req.params.id)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    await user.update({ tokenLimit })

    // Remove password from response
    const userResponse = user.toJSON()
    delete userResponse.password

    res.json({
      data: userResponse,
      message: "Token limit updated successfully",
    })
  } catch (error) {
    console.error("Update token limit error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
