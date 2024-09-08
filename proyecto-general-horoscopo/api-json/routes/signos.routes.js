const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');

router.get('/', signoController.getAllSignos);
router.get('/:signo/:perfil', signoController.getOneSigno);
router.patch('/:signoEditar', signoController.updateSigno);

module.exports = router;