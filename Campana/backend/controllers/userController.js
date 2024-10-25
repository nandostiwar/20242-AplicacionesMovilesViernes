// /controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Registro de usuario
const registerUser = async (req, res) => {
  const { name, email, password, address, phone, birthdate } = req.body;
  console.log("Datos recibidos:", req.body); // Para depuración

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    console.log("Usuario existente:", existingUser); // Para depuración

    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está en uso.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const user = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      birthdate,
    });

    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    console.error("Error al registrar el usuario:", error); // Imprimir el error en la consola
    if (error.code === 11000) {
      return res.status(400).json({ message: 'El correo ya está en uso.' });
    }
    res.status(500).json({ message: 'Error al registrar el usuario.', error });
  }
};

module.exports = { registerUser };
