const express = require("express");
const { signUpUserGET, signInUserGET, signUpUserPOST, signInUserPOST } = require("../controllers/user.controller");
const router = express.Router();

router.get('/sign-up',signUpUserGET);
router.get('/login',signInUserGET);

router.post('/sign-up',signUpUserPOST);
router.post('/login',signInUserPOST);

module.exports=router;