const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { homepage } = require("../controllers/index.controller");

const router = express.Router();

router.get('/home',authMiddleware,homepage);

module.exports=router;
