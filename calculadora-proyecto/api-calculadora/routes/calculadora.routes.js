const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/sumar', calculadoraControllers.sumar)
    .post('/restar', calculadoraControllers.restar)
    .post('/multiplicar', calculadoraControllers.multiplicar)
    .post('/promedio', calculadoraControllers.promedio)
    .post('/mayor', calculadoraControllers.mayor)
    .post('/menor', calculadoraControllers.menor)

module.exports = router;