const express = require('express');
const { signin, signup, signout , forgotPassword, resetPassword, socialLogin} = require('../controllers/auth')
const { userById } = require("../controllers/user");
const router = express.Router();
// import password reset validator
const { userSingupValidator, passwordResetValidator }= require('../validator')



router.post("/signup", userSingupValidator, signup);
router.post("/signin", signin);
//signout method
router.get("/signout", signout);

// password forgot and reset routes
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);

// then use this route for social login
router.post("/social-login", socialLogin);



// any route containing :userId, our app will first execute UserById()
router.param("userId", userById)

module.exports = router;

