// backend/models/UserDetails.js
const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,  // Referencia al ID de la colección `users`
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);
module.exports = UserDetails;
