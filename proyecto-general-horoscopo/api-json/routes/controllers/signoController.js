const Signo = require('../../models/Signo');
const Usuario = require('../../models/Usuario');

// Obtener todos los signos
const getAllSignos = async (req, res) => {
    try {
        const signos = await Signo.find();  // Obtener todos los signos desde MongoDB
        res.json(signos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los signos' });
    }
};

// Obtener un signo específico
const getOneSigno = async (req, res) => {
    try {
        const signo = await Signo.findOne({ nombre: req.params.signo });  // Buscar signo por nombre
        if (signo) {
            res.json(signo);
        } else {
            res.status(404).json({ error: 'Signo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el signo' });
    }
};

// Actualizar signo
const updateSigno = async (req, res) => {
    try {
        const signo = await Signo.findOneAndUpdate(
            { nombre: req.params.signoEditar },
            { descripcion: req.body.textoEditar },
            { new: true }
        );
        res.json(signo);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el signo' });
    }
};

// Comparar login
const compareLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const usuario = await Usuario.findOne({ user: username });

        if (usuario) {
            if (usuario.pass === password) {
                res.json({ resultado: usuario.rol });
            } else {
                res.status(401).json({ error: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar el login' });
    }
};

// Actualizar contraseña
const updatePassword = async (req, res) => {
    try {
        const { username, currentPassword, newPassword } = req.body;
        const usuario = await Usuario.findOne({ user: username });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        if (usuario.pass !== currentPassword) {
            return res.status(401).json({ error: 'Contraseña actual incorrecta' });
        }

        usuario.pass = newPassword;
        await usuario.save();

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la contraseña' });
    }
};

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    compareLogin,
    updatePassword
};
