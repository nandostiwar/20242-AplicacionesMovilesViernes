const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');
router
    .get('/', signoController.getAllSignos)
    .get('/:signo', signoController.getOneSigno)
    .patch('/:signoEditar', signoController.updateSigno)
    .post('/login', signoController.compareLogin)
    .get('/update', signoController.UpdateData)
    //.get('/newUser',signoController.newUser)

module.exports = router;