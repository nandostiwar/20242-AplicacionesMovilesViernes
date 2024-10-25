// models/Code.js
const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // Código de 3 dígitos
    prize: { type: String }, // Premio asociado (si lo tiene)
    used: { type: Boolean, default: false }, // Indica si el código ha sido usado
    usedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Usuario que usó el código
    dateUsed: { type: Date } // Fecha en que el código fue usado
});

module.exports = mongoose.model('Code', codeSchema);
