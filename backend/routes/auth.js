const express = require("express");
const router = express.Router();

//const { verifyToken } = require("../Controllers/FriendController");
const { Register, ClearDB, Login } = require("../Controllers/AuthController");

const { AuthenticateToken, IsTokenValid } = require("../Controllers/MiddleWearController");
//^^^
//AuthenticateToken is middlewear to verifyToken and give a new one
//Authenticate token should take care of all middlewear handling of tokens
//IsTokenValid simply tells us if token is valid or not. Nothing else

//router.get("/", VerifyToken);
router.post("/register", Register);
router.post("/login", Login);
//router.post("/refresh", RefreshAccessToken);
router.get("/validToken", IsTokenValid);
router.post("/clearDB", ClearDB);

module.exports = router;
