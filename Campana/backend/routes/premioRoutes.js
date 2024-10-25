// backend/routes/premioRoutes.js

const express = require('express');
const { ingresarCodigo, obtenerCodigos } = require('../controllers/premioController');
const router = express.Router();

router.post('/ingresar-codigo', ingresarCodigo);
router.get('/:usuarioId', obtenerCodigos);

module.exports = router;
