const { register, login } = require("../controllers/auth.controllers");
const express = require("express");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

module.exports = authRouter;
