const express = require('express');
const router = express.Router();
const signoController = require('./controllers/controller.js');
router
    
    .get('/:login', signoController.compareLogin)
    .post('/nuevaCuenta', signoController.newPerfil)
    .post('/cambioPass', signoController.updatePassword);

module.exports = router;