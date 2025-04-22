const { DataTypes } = require("sequelize")

const Ingredient = (sequelize) => {
  const Ingredient = sequelize.define(
    "Ingredient",
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
      description: {
        type: DataTypes.TEXT,
      },
      source: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(255),
      },
      type: {
        type: DataTypes.STRING(50),
        defaultValue: "Veg",
      },
      allergen: {
        type: DataTypes.STRING(255),
        defaultValue: "None",
      },
      glycemicIndex: {
        type: DataTypes.FLOAT,
        validate: {
          min: 0,
          max: 100,
        },
      },
      // Macros
      moisture: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      protein: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      fat: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      fibre: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      carbohydrate: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      energy: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      // Minerals
      calcium: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      phosphorous: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      iron: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      sodium: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      potassium: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      zinc: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      magnesium: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      // Vitamins
      carotene: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      thiamine: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      riboflavin: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      niacin: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      vitaminC: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      folicAcidFree: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      folicAcidTotal: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      // Amino Acids
      histidine: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      isoleucine: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      leucine: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      lysine: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      methionine: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      phenylalanine: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      threonine: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      tryptophan: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      valine: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      // Foreign key for creator
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt
      indexes: [
        {
          fields: ["name"],
        },
        {
          fields: ["source"],
        },
        {
          fields: ["type"],
        },
        {
          fields: ["category"],
        },
        {
          fields: ["createdBy"],
        },
      ],
    },
  )

  // Instance method to get nutrition data
  Ingredient.prototype.getNutritionData = function () {
    return {
      id: this.id,
      name: this.name,
      macros: {
        moisture: this.moisture,
        protein: this.protein,
        fat: this.fat,
        fibre: this.fibre,
        carbohydrate: this.carbohydrate,
        energy: this.energy,
      },
      minerals: {
        calcium: this.calcium,
        phosphorous: this.phosphorous,
        iron: this.iron,
        sodium: this.sodium,
        potassium: this.potassium,
        zinc: this.zinc,
        magnesium: this.magnesium,
      },
      vitamins: {
        carotene: this.carotene,
        thiamine: this.thiamine,
        riboflavin: this.riboflavin,
        niacin: this.niacin,
        vitaminC: this.vitaminC,
        folicAcid: {
          free: this.folicAcidFree,
          total: this.folicAcidTotal,
        },
      },
      aminoAcids: {
        histidine: this.histidine,
        isoleucine: this.isoleucine,
        leucine: this.leucine,
        lysine: this.lysine,
        methionine: this.methionine,
        phenylalanine: this.phenylalanine,
        threonine: this.threonine,
        tryptophan: this.tryptophan,
        valine: this.valine,
      },
    }
  }

}
module.exports = Ingredient;
