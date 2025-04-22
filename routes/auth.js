const express = require("express")
const jwt = require("jsonwebtoken")
const { User } = require("../models")
const { authenticateToken } = require("../middleware/auth")

const router = express.Router()

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

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
      role: "User", // Default role
      tokenLimit: 5000, // Default token limit
      tokensUsed: 0,
      active: true,
    })

    // Remove password from response
    const userResponse = user.toJSON()
    delete userResponse.password

    res.status(201).json({ data: userResponse })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    // Find user
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    // Check if user is active
    if (!user.active) {
      return res.status(403).json({ error: "Account is inactive. Please contact support." })
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" })

    // Remove password from response
    const userResponse = user.toJSON()
    delete userResponse.password

    res.json({
      data: {
        user: userResponse,
        token,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Generate API key
router.post("/api-key", authenticateToken, async (req, res) => {
  try {
    const user = req.user

    // Generate new API key
    const apiKey = await user.generateApiKey()

    res.json({
      data: {
        apiKey,
      },
    })
  } catch (error) {
    console.error("API key generation error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Verify token (for frontend validation)
router.get("/verify", authenticateToken, (req, res) => {
  // If middleware passes, token is valid
  const user = req.user.toJSON()
  delete user.password

  res.json({
    data: {
      user,
    },
  })
})

module.exports = router
