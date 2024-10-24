const express = require('express');
const router = express.Router();
const loginController = require('../controller/login.controller');

router
    .post('/login', loginController.validarUsuario)
    .post('/registrar', loginController.registrar)

module.exports = router;