const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const TokenUsage = sequelize.define(
    "TokenUsage",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      endpoint: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      method: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      tokensUsed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt
      indexes: [
        {
          fields: ["userId"],
        },
        {
          fields: ["timestamp"],
        },
      ],
    },
  )

  return TokenUsage
}
