const express = require("express");
const UserController = require("../controllers/user.controller");

//Setting up the Express Router
const Router = express.Router();

//Setting up Routes
Router.post("/addUser", UserController.addUser)
Router.post("/login", UserController.login)

module.exports = Router;