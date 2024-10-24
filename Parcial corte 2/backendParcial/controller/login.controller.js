const fs = require("fs/promises");
const path = require("path");

const { usuario } = require('../db/models/users.schema')

const validarUsuario = async (req, res) => {
  try {

    const { nombre , contrasena } = req.body;

    const usuarios = await usuario.find({nombre, contrasena})
    console.log('usuarios', usuarios)

    if (!usuarios) {
      // Si no existe, devolver una respuesta con un mensaje de error
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    } 
  
    // Si el usuario existe, devolver una respuesta OK
    return res.status(200).json({ mensaje: 'Login exitoso', usuario: usuarios });

  } catch (error) {}
};

const registrar = async (req, res) => {
  try {

    // const { nombre, contrasena, cedula, celular, ciudad, correo } = req.body;

    const createUser = await usuario.create(req.body)
    console.log(createUser)
  
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

module.exports = {
  validarUsuario,
  registrar
};
