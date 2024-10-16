const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    user: { type: String, required: true },
    pass: { type: String, required: true },
    rol: { type: String, required: true }
});

module.exports = mongoose.model('Usuarios', usuarioSchema);