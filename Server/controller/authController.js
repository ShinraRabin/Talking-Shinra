const bcrypt = require("bcrypt");
const db = require("../../Public/js/index");
const jwt = require("jsonwebtoken");
const sequelize = db.sequelize; // Assuming you have defined the Sequelize instance as "sequelize"
const User = db.Users;
const path = require("path");




exports.registerUsers = async function register(req, res) {
  console.log(req.body);
  try {
    const existingUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await sequelize.query(
      "INSERT INTO users (name, email,password) VALUES (?,?,?)",
      {
        replacements: [
          req.body.first_name + " " + req.body.last_name,
          req.body.email,
          hashedPassword,
        ],
        type: sequelize.QueryTypes.INSERT,
      }
    );
    var token = jwt.sign({ id: User.id }, "TalkingShinra", {
      expiresIn: 86400,
    });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: false,
      secure: false,
    });

    console.log("User registered successfully");
    return res.redirect("/login");
  } catch (error) {
    console.log("Error while registering user:", error);
    return res.status(400).json({ message: "Error while registering user" });
  }
};

exports.loginUsers = async function login(req, res) {
  try {
    const [existingUser] = await sequelize.query(
      "SELECT * FROM users WHERE email = ?",
      {
        replacements: [req.body.email],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!existingUser) {
      throw new Error("Please enter correct email ");
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (!passwordMatch) {
      throw new Error("Please enter correct  password");
    }
    var token = jwt.sign({ id: User.id }, "TalkingShinra", {
      expiresIn: 86400,
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: false,
      secure: false,
    });
    console.log("User Login Successful");
    console.log("User:", existingUser);
    return res.redirect("/room");
  } catch (error) {
    console.error("Error logging in:", error);
    return res.redirect("/login");
  }
};
