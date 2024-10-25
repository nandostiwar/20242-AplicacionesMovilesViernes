// backend/controllers/premioController.js

const Premio = require('../models/Premio');

// Ingresar código
exports.ingresarCodigo = async (req, res) => {
  const { codigo, usuarioId } = req.body;

  try {
    const codigoUsado = await Premio.findOne({ codigo });
    if (codigoUsado) {
      return res.status(400).json({ message: 'Este código ya ha sido utilizado.' });
    }

    const esGanador = Math.random() < 0.3; // 30% de probabilidad de ganar
    const premio = esGanador ? '5 millones' : 'Mala suerte, inténtalo nuevamente';

    const nuevoPremio = new Premio({ codigo, premio, usuarioId });
    await nuevoPremio.save();

    res.status(200).json({ message: 'Código ingresado con éxito', premio });
  } catch (error) {
    res.status(500).json({ message: 'Error al ingresar el código' });
  }
};

// Obtener códigos del usuario
exports.obtenerCodigos = async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const codigos = await Premio.find({ usuarioId });
    res.status(200).json(codigos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los códigos' });
  }
};
