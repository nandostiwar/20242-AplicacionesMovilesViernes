// backend/models/Premio.js

const mongoose = require('mongoose');

const premioSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  premio: { type: String, required: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fechaIngreso: { type: Date, default: Date.now },
});

const Premio = mongoose.model('Premio', premioSchema);

module.exports = Premio;
