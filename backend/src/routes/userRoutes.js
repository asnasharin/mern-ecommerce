const express = require("express")
const { loginController, RegisterController} = require("../controllers/userController");

const route = express.Router();

route.post("/register", RegisterController);
console.log("RegisterController:", RegisterController);
route.post("/login", loginController);

console.log("User routes loaded");

module.exports = route;