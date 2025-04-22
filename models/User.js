const { DataTypes } = require("sequelize")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(50),
        defaultValue: "User",
      },
      tokenLimit: {
        type: DataTypes.INTEGER,
        defaultValue: 5000,
      },
      tokensUsed: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      lastLogin: {
        type: DataTypes.DATE,
      },
      apiKey: {
        type: DataTypes.STRING(255),
        unique: true,
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
          }
        },
      },
    },
  )

  // Instance methods
  User.prototype.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
  }

  User.prototype.generateApiKey = async function () {
    this.apiKey = crypto.randomBytes(32).toString("hex")
    await this.save()
    return this.apiKey
  }

  return User
}
