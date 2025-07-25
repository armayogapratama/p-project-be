"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Testimonies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Testimonies.belongsTo(models.User);
      Testimonies.hasMany(models.Product);
    }
  }
  Testimonies.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "title cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "title cannot be empty",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "description cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "description cannot be empty",
          },
        },
      },
      usersId: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      productsId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Testimonies",
    }
  );
  return Testimonies;
};
