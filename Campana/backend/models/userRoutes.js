// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const Code = require('../models/Code');

// GET /codigos-usuario/:userId
router.get('/codigos-usuario/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const codes = await Code.find({ usedBy: userId }).select('code prize dateUsed');
        return res.status(200).json(codes);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los códigos', error });
    }
});

module.exports = router;
