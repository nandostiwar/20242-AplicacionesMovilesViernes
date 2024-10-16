const mongoose = require('mongoose');

const signoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true }
});

module.exports = mongoose.model('signos', signoSchema);
