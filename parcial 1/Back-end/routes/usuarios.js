const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuariosController');

router.post('/crearUsuario', usuario.guardarUsuario);
router.post('/cambiarPassword', usuario.cambiarPassword);

module.exports = router; 
