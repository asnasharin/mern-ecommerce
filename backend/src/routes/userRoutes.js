const express = require("express")
const { loginController, RegisterController} = require("../controllers/userController");

const route = express.Router();

route.post("/register", RegisterController);
route.post("/login", loginController);

export default route;