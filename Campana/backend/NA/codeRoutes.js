// routes/codeRoutes.js
const express = require('express');
const router = express.Router();
const Code = require('../models/Code');
const User = require('../models/User');

// POST /ingresar-codigo
router.post('/ingresar-codigo', async (req, res) => {
    const { userId, code } = req.body;

    try {
        // Buscar si el código existe
        const existingCode = await Code.findOne({ code });

        if (!existingCode) {
            return res.status(404).json({ message: 'Código inválido' });
        }

        // Verificar si el código ya ha sido usado
        if (existingCode.used) {
            return res.status(400).json({ message: 'Código ya ha sido usado' });
        }

        // Si no ha sido usado, marcarlo como usado y asignar al usuario
        existingCode.used = true;
        existingCode.usedBy = userId;
        existingCode.dateUsed = new Date();

        await existingCode.save();

        // Obtener el premio (si tiene)
        const prize = existingCode.prize ? existingCode.prize : 'Mala suerte, inténtalo nuevamente';

        // Devolver el resultado
        return res.status(200).json({ message: 'Código ingresado con éxito', prize });
    } catch (error) {
        return res.status(500).json({ message: 'Error al ingresar el código', error });
    }
});

module.exports = router;
