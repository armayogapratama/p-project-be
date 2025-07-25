"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Balance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Balance.belongsTo(models.User);
    }
  }
  Balance.init(
    {
      balance: DataTypes.NUMBER,
      currency: DataTypes.STRING,
      usersId: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Balance",
    }
  );
  return Balance;
};
