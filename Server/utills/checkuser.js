const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const db = require("../../Public/js/index");
const User = db.Users;

exports.checkUser = async (req, res, next) => {
  const authorizatonHeader = req.headers.authorization;
  const { jwtToken } = req.cookies;

  let token;
  if (authorizatonHeader && authorizatonHeader.startsWith("Bearer")) {
    token = authorizatonHeader.split(" ")[1];
  } else {
    token = jwtToken;

  }

  if (!token) {
    return res.status(400).json({
      message: "You must be logged In",
    });
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const loggedInUser = await User.findOne({ where: { id: decoded.id } });
  if (!loggedInUser) {
    return res.status(400).json({
      message: "You are not the user belonging to this token",
    });
  }
  res.status(200).json({
    status: 200,
    message: "Authenticated",
    auth: true,
  });
};
