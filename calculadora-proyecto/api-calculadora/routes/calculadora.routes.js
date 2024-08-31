const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/sumar', calculadoraControllers.sumar)
    .post('/restar', calculadoraControllers.restar)
    .post('/multiplicar', calculadoraControllers.multiplicar)
    .post('/mayor', calculadoraControllers.calcularMayor)
    .post('/menor', calculadoraControllers.calcularMenor)
    .post('/promedio', calculadoraControllers.calcularPromedio)

module.exports = router;