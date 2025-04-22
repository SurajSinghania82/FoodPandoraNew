module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Ingredients", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      source: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: "Veg",
      },
      allergen: {
        type: Sequelize.STRING,
        defaultValue: "None",
      },
      glycemicIndex: {
        type: Sequelize.FLOAT,
      },
      // Macros
      moisture: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      protein: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      fat: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      fibre: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      carbohydrate: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      energy: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      // Minerals
      calcium: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      phosphorous: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      iron: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      sodium: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      potassium: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      zinc: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      magnesium: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      // Vitamins
      carotene: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      thiamine: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      riboflavin: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      niacin: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      vitaminC: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      folicAcidFree: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      folicAcidTotal: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      // Amino Acids
      histidine: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      isoleucine: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      leucine: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      lysine: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      methionine: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      phenylalanine: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      threonine: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      tryptophan: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      valine: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: true,
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
    await queryInterface.addIndex("Ingredients", ["name"])
    await queryInterface.addIndex("Ingredients", ["source"])
    await queryInterface.addIndex("Ingredients", ["type"])
    await queryInterface.addIndex("Ingredients", ["category"])
    await queryInterface.addIndex("Ingredients", ["createdBy"])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Ingredients")
  },
}
