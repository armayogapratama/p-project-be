const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

async function authentication(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) throw { name: "InvalidUser" };

    const [bearer, accessToken] = token.split(" ");

    if (bearer !== "Bearer") throw { name: "InvalidUser" };

    const payload = verifyToken(accessToken);

    const user = await User.findByPk(payload.id);

    if (!user) throw { name: "InvalidUser" };

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
