// /models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  birthdate: { type: Date },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
