const express = require("express");
const {
  registerNewUser,
  loginUser,
  logout,
  showCurrent,
} = require("../../models/users");
const { validateCredentials } = require("../../models/validation");
const { auth } = require("../../service/jwtAuthStuff");

const usersRouter = express.Router();

usersRouter.post("/register", validateCredentials, registerNewUser);

usersRouter.get("/login", validateCredentials, loginUser);

usersRouter.post("/logout", auth, logout);

usersRouter.get("/current", auth, showCurrent);

module.exports = {
  usersRouter,
};
