const express = require('express');
const { getAllSignos, getOneSigno, updateSigno } = require('../controllers/signoController');
const signosRoutes = express.Router();


signosRoutes.get("/getSignos", getAllSignos);
signosRoutes.get("/:signo", getOneSigno);
signosRoutes.patch("/actualizar/:signoEditar", updateSigno);

module.exports = signosRoutes;
