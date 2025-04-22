const { Sequelize } = require("sequelize")
const dotenv = require("dotenv")

dotenv.config()

// Initialize Sequelize with database connection
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || "mssql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 1433,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "food-pandora",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  },
})

// Import models
const User = require("./User")(sequelize)
const Ingredient = require("./Ingredient")(sequelize)
const TokenUsage = require("./TokenUsage")(sequelize)

// Define associations
User.hasMany(TokenUsage, { foreignKey: "userId" })
TokenUsage.belongsTo(User, { foreignKey: "userId" })

User.hasMany(Ingredient, { foreignKey: "createdBy", as: "ingredients" })
Ingredient.belongsTo(User, { foreignKey: "createdBy", as: "creator" })

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Ingredient,
  TokenUsage,
}
