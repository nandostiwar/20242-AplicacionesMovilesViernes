const fs = require('fs');
const path = require('path');
const archivoUsuarios = path.join(__dirname, '../db/usuarios.json');

const guardarUsuario = (req, res) => {
    const { username, password, role } = req.body;
    const nuevoUsuario = { username, password, role};

    fs.readFile(archivoUsuarios, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        const usuarios = JSON.parse(data);
        usuarios.push(nuevoUsuario);

        fs.writeFile(archivoUsuarios, JSON.stringify(usuarios), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo:', err);
                return res.status(500).json({ message: 'Error interno del servidor' });
            }

            res.json({ message: 'Usuario guardado exitosamente' });
        });
    });
};

const cambiarPassword = (req, res) => {
    const { username, nuevaPassword } = req.body;

    fs.readFile(archivoUsuarios, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        let usuarios = JSON.parse(data);
        const usuario = usuarios.find(user => user.username === username);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        usuario.password = nuevaPassword;

        fs.writeFile(archivoUsuarios, JSON.stringify(usuarios), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo:', err);
                return res.status(500).json({ message: 'Error interno del servidor' });
            }

            res.json({ message: 'Contraseña actualizada exitosamente' });
        });
    });
};

module.exports = {
    guardarUsuario,
    cambiarPassword
};
