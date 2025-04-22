const express = require("express")
const { Op } = require("sequelize")
const { Ingredient, User } = require("../models")
const { authenticateToken, trackTokenUsage, isAdmin } = require("../middleware/auth")

const router = express.Router()

// Get all ingredients with pagination, filtering, and sorting
router.get("/", authenticateToken, trackTokenUsage(1), async (req, res) => {
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
        { description: { [Op.iLike]: `%${req.query.search}%` } },
        { category: { [Op.iLike]: `%${req.query.search}%` } },
      ]
    }

    // Filter by source
    if (req.query.source) {
      where.source = { [Op.in]: req.query.source.split(",") }
    }

    // Filter by type
    if (req.query.type) {
      where.type = { [Op.in]: req.query.type.split(",") }
    }

    // Filter by glycemic index range
    if (req.query.giMin || req.query.giMax) {
      where.glycemicIndex = {}
      if (req.query.giMin) where.glycemicIndex[Op.gte] = Number.parseInt(req.query.giMin)
      if (req.query.giMax) where.glycemicIndex[Op.lte] = Number.parseInt(req.query.giMax)
    }

    // Build sort
    const order = []
    if (req.query.sortField) {
      order.push([req.query.sortField, req.query.sortDirection === "desc" ? "DESC" : "ASC"])
    } else {
      order.push(["name", "ASC"]) // Default sort
    }

    // Execute query with pagination
    const { rows: ingredients, count: total } = await Ingredient.findAndCountAll({
      where,
      order,
      offset,
      limit,
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "name", "email"],
        },
      ],
    })

    res.json({
      data: ingredients,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      tokenUsage: res.locals.tokenUsage,
    })
  } catch (error) {
    console.error("Get ingredients error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get ingredient by ID
router.get("/:id", authenticateToken, trackTokenUsage(1), async (req, res) => {
  try {
    const ingredient = await Ingredient.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "name", "email"],
        },
      ],
    })

    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found" })
    }

    res.json({
      data: ingredient,
      tokenUsage: res.locals.tokenUsage,
    })
  } catch (error) {
    console.error("Get ingredient error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get detailed nutrition data for an ingredient
router.get("/:id/nutrition", authenticateToken, trackTokenUsage(5), async (req, res) => {
  try {
    const ingredient = await Ingredient.findByPk(req.params.id)

    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found" })
    }

    // Get nutrition data using the instance method
    const nutritionData = ingredient.getNutritionData()

    res.json({
      data: nutritionData,
      tokenUsage: res.locals.tokenUsage,
    })
  } catch (error) {
    console.error("Get nutrition data error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Create new ingredient (admin only)
router.post("/", authenticateToken, isAdmin, async (req, res) => {
  try {
    // Create new ingredient
    const ingredient = await Ingredient.create({
      ...req.body,
      createdBy: req.user.id,
    })

    res.status(201).json({
      data: ingredient,
    })
  } catch (error) {
    console.error("Create ingredient error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Update ingredient (admin only)
router.put("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const ingredient = await Ingredient.findByPk(req.params.id)

    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found" })
    }

    // Update ingredient
    await ingredient.update(req.body)

    res.json({
      data: ingredient,
    })
  } catch (error) {
    console.error("Update ingredient error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Delete ingredient (admin only)
router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const ingredient = await Ingredient.findByPk(req.params.id)

    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found" })
    }

    await ingredient.destroy()

    res.json({
      success: true,
    })
  } catch (error) {
    console.error("Delete ingredient error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Batch get ingredients
router.post("/batch", authenticateToken, async (req, res) => {
  try {
    const { ids } = req.body

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ error: "Invalid request. IDs array is required." })
    }

    // Calculate token cost (1 per ingredient)
    const tokenCost = ids.length

    // Track token usage
    const trackMiddleware = trackTokenUsage(tokenCost)
    await new Promise((resolve) => {
      trackMiddleware(req, res, resolve)
    })

    // If token tracking middleware failed, it would have sent a response already
    if (res.headersSent) return

    // Get ingredients
    const ingredients = await Ingredient.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    })

    res.json({
      data: ingredients,
      tokenUsage: res.locals.tokenUsage,
    })
  } catch (error) {
    console.error("Batch get ingredients error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Bulk upload ingredients (admin only)
router.post("/bulk", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { ingredients } = req.body

    if (!ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: "Invalid request. Ingredients array is required." })
    }

    // Add createdBy to each ingredient
    const ingredientsWithCreator = ingredients.map((ingredient) => ({
      ...ingredient,
      createdBy: req.user.id,
    }))

    // Insert many
    const result = await Ingredient.bulkCreate(ingredientsWithCreator)

    res.status(201).json({
      data: {
        count: result.length,
        message: `${result.length} ingredients added successfully`,
      },
    })
  } catch (error) {
    console.error("Bulk upload error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
