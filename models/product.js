"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User);
      Product.belongsTo(models.Category);
      Product.belongsTo(models.Testimonies);
      Product.belongsTo(models.Transaction);
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "name cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "name cannot be empty",
          },
        },
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "cover cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "cover cannot be empty",
          },
        },
      },
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
      file: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "file cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "file cannot be empty",
          },
        },
      },
      usersId: DataTypes.NUMBER,
      categoriesId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
