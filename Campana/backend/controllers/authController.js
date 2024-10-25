// /controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Iniciar sesión
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales incorrectas.' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales incorrectas.' });
    }

    // Aquí podrías generar un token JWT si estás usando autenticación basada en tokens

    res.status(200).json({ message: 'Inicio de sesión exitoso.', user });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: 'Error en el servidor.', error });
  }
};

module.exports = { loginUser };
