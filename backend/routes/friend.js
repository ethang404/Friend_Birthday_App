const express = require("express");
const router = express.Router();

const { VerifyToken, IsTokenValid } = require("../Controllers/MiddleWearController");
const { friendOutput } = require("../Controllers/FriendController");

//router.get("/testOutput", friendOutput);
router.get("/test", VerifyToken, friendOutput);
module.exports = router;
