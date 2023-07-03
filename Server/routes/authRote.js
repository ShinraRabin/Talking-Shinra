const {
    registerUsers,
    loginUsers,
  } = require("../controller/authController");
const { checkUser } = require("../utills/checkuser");
  


  
  const router = require("express").Router();
  
  router.route("/register").post(registerUsers);
  router.route("/login").post(loginUsers);
  router.route("/checkuser").post(checkUser);





  
  module.exports = router;
  