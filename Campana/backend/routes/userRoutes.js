// /routes/userRoutes.js
const express = require('express');
const { registerUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/authController');
//const { ingresarCodigo } = require('../controllers/premioController');

const router = express.Router();

// Ruta para registrar usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para ingresar codigos
//router.post('/UserProfile', ingresarCodigo);

module.exports = router;
