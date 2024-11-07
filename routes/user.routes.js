const express = require("express");
const { signUpUserGET, signInUserGET, signUpUserPOST, signInUserPOST ,homepage ,logoutUser} = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get('/sign-up',signUpUserGET);
router.get('/login',signInUserGET);
router.get('/home',authMiddleware,homepage);
router.get('/logout',logoutUser);

router.post('/sign-up',signUpUserPOST);
router.post('/login',signInUserPOST);
router.post('/logout',authMiddleware,logoutUser);

module.exports=router;