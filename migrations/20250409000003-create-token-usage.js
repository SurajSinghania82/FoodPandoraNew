module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("TokenUsages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      endpoint: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tokensUsed: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })

    // Add indexes
    await queryInterface.addIndex("TokenUsages", ["userId"])
    await queryInterface.addIndex("TokenUsages", ["timestamp"])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("TokenUsages")
  },
}
