const express = require('express');
const router = express.Router();
const signoController = require('./controllers/controller.js');
router
    
    .post('/login', signoController.compareLogin)
    .post('/nuevaCuenta', signoController.newProfile)
    .post('/cambioPass', signoController.updatePassword)

module.exports = router;