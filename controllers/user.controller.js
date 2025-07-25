const { verifyPassword } = require("../helpers/hashPassword");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/index");

class UserController {
  static async register(req, res) {
    try {
      const { name, email, password, phoneNumber } = req.body;

      if (!name || !email || !password || !phoneNumber)
        throw { name: "EmailPasswordEmpty" };

      const username = name.toLowerCase().split(" ").join("");

      const user = await User.create({
        name,
        username: username,
        email,
        password,
        phoneNumber,
        role: "User",
      });

      res.status(201).json({
        status: "Success",
        message: "User successfully registered",
        data: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "EmailPasswordEmpty" };

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user || !verifyPassword(password, user.password))
        throw { name: "InvalidUser" };

      const accessToken = signToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        status: "Success",
        message: "User successfully logged in",
        data: accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
