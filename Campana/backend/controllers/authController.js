// /controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Registro de usuario
const registerUser = async (req, res) => {
  const { name, email, password, address, phone, birthdate } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está en uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    console.error("Error al registrar el usuario:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'El correo ya está en uso.' });
    }
    res.status(500).json({ message: 'Error al registrar el usuario.', error });
  }
};

// Iniciar sesión
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales incorrectas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales incorrectas.' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso.', user });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: 'Error en el servidor.', error });
  }
};

module.exports = { registerUser, loginUser };
