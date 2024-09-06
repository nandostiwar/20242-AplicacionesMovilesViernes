const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');
router
    .get('/', signoController.getAllSignos)
    .get('/:categoriaU/:signoU', signoController.getOneSigno)
    .patch('/:categoria/:signoEditar', signoController.updateSigno)

module.exports = router;