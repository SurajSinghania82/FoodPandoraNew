const bcrypt = require("bcrypt")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("admin123", 10)

    return queryInterface.bulkInsert("Users", [
      {
        name: "Admin User",
        email: "admin@foodpandora.com",
        password: hashedPassword,
        role: "Admin",
        tokenLimit: 100000,
        tokensUsed: 0,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLogin: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", { email: "admin@foodpandora.com" }, {})
  },
}
