"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/hashPassword");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product);
      User.hasMany(models.Balance);
      User.hasMany(models.Testimonies);
      User.hasMany(models.Transaction);
    }
  }
  User.init(
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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "username cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "username cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "email already exists",
        },
        validate: {
          notNull: {
            args: true,
            msg: "email cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "email cannot be empty",
          },
          isEmail: {
            args: true,
            msg: "email is not valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "",
          },
          notEmpty: {
            args: true,
            msg: "",
          },
          len: {
            args: [6, 20],
            msg: "password must be between 6 and 20 characters",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "",
          },
          notEmpty: {
            args: true,
            msg: "",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "",
          },
          notEmpty: {
            args: true,
            msg: "",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });

  return User;
};
