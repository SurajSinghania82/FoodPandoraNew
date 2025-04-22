const jwt = require("jsonwebtoken")
const { User, TokenUsage } = require("../models")

// Middleware to authenticate JWT token
exports.authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized. Missing or invalid token format." })
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "Unauthorized. No token provided." })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Find user
    const user = await User.findByPk(decoded.userId)

    if (!user) {
      return res.status(401).json({ error: "Unauthorized. User not found." })
    }

    if (!user.active) {
      return res.status(403).json({ error: "Forbidden. Account is inactive." })
    }

    // Attach user to request
    req.user = user

    next()
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized. Invalid token." })
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized. Token expired." })
    }
    console.error("Auth middleware error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

// Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ error: "Forbidden. Admin access required." })
  }
  next()
}

// Middleware to track token usage
exports.trackTokenUsage = (tokenCost) => {
  return async (req, res, next) => {
    try {
      const user = req.user

      // Check if user has enough tokens
      if (user.tokensUsed + tokenCost > user.tokenLimit) {
        return res.status(403).json({
          error: "Insufficient tokens. Please upgrade your plan.",
          tokenUsage: {
            remaining: user.tokenLimit - user.tokensUsed,
            limit: user.tokenLimit,
          },
        })
      }

      // Update user's token usage
      user.tokensUsed += tokenCost
      await user.save()

      // Record token usage
      await TokenUsage.create({
        userId: user.id,
        endpoint: req.originalUrl,
        method: req.method,
        tokensUsed: tokenCost,
        timestamp: new Date(),
      })

      // Add token usage info to response
      res.locals.tokenUsage = {
        cost: tokenCost,
        remaining: user.tokenLimit - user.tokensUsed,
        limit: user.tokenLimit,
      }

      next()
    } catch (error) {
      console.error("Token tracking error:", error)
      return res.status(500).json({ error: "Internal server error" })
    }
  }
}
