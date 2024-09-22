const express = require("express");
const { createNewUser, updatePassword, validarLogin } = require("../controllers/userController.js");

const userRoutes = express.Router();

userRoutes.post("/createUser", createNewUser);
userRoutes.post("/actualizarPassword", updatePassword);
userRoutes.post("/login", validarLogin);

module.exports = userRoutes;
