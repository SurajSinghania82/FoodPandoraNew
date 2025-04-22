const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const morgan = require("morgan")
const dotenv = require("dotenv")

// Import database connection
const { sequelize } = require("./models")

// Import routes
const authRoutes = require("./routes/auth")
const ingredientRoutes = require("./routes/ingredients")
const userRoutes = require("./routes/users")
const tokenUsageRoutes = require("./routes/tokenUsage")

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet()) // Security headers
app.use(cors()) // Enable CORS
app.use(express.json()) // Parse JSON bodies
app.use(morgan("dev")) // Logging

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  message: { error: "Too many requests, please try again later." },
})

// Apply rate limiting to API routes
app.use("/api", apiLimiter)

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/ingredients", ingredientRoutes)
app.use("/api/users", userRoutes)
app.use("/api/token-usage", tokenUsageRoutes)

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!" })
})

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("Failed to sync database:", err)
  })

module.exports = app // For testing
