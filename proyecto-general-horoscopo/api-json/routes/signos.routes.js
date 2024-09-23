const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');
router
    .get('/', signoController.getAllSignos)
    .get('/:signo', signoController.getOneSigno)
    .patch('/:signoEditar', signoController.updateSigno)
    .post('/login', signoController.compareLogin)
<<<<<<< HEAD
    .put('/updateData', signoController.UpdateData);
=======
    .get('/update', signoController.UpdateData)
>>>>>>> b46c0aa11e4e757d10f1a9e11642aa4e66474b13

module.exports = router;