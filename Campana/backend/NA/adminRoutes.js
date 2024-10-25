// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const Code = require('../models/Code');

// GET /ganadores
router.get('/ganadores', async (req, res) => {
    try {
        const winners = await Code.find({ prize: { $ne: null }, used: true })
            .populate('usedBy', 'name email') // Popula con info del usuario
            .select('code prize dateUsed usedBy');

        return res.status(200).json(winners);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los ganadores', error });
    }
});

module.exports = router;
