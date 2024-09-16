const fs = require('fs/promises');
const path = require('path');

// Define la ruta a los archivos de credenciales y signos
const signosPath = path.join(__dirname, '../../db/signos.json');
const credentialsPath = path.join(__dirname, '../../db/credenciales.json');

const getAllSignos = async (req, res) => {
    try {
        const signo = await fs.readFile(signosPath, 'utf8');
        const signosJson = JSON.parse(signo);
        res.json(signosJson);
    } catch (error) {
        console.error('Error al leer los signos:', error);
        res.status(500).json({ error: 'Error al leer los signos' });
    }
};

const getOneSigno = async (req, res) => {
    try {
        const oneSigno = req.params.signo;
        const allSignos = await fs.readFile(signosPath, 'utf8');
        const objSignos = JSON.parse(allSignos);
        const result = objSignos[oneSigno];
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Signo no encontrado' });
        }
    } catch (error) {
        console.error('Error al leer el signo:', error);
        res.status(500).json({ error: 'Error al leer el signo' });
    }
};

const updateSigno = async (req, res) => {
    try {
        const signoEditar = req.params.signoEditar;
        const { textoEditar } = req.body;
        const allSignos = await fs.readFile(signosPath, 'utf8');
        const objSignos = JSON.parse(allSignos);

        const objUpdate = {
            ...objSignos,
            [signoEditar]: textoEditar
        };

        await fs.writeFile(signosPath, JSON.stringify(objUpdate, null, 2), 'utf8');

        res.json({ message: 'Updated' });
    } catch (error) {
        console.error('Error al actualizar el signo:', error);
        res.status(500).json({ error: 'Error al actualizar el signo' });
    }
};

const compareLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await fs.readFile(credentialsPath, 'utf8');
        const credentials = JSON.parse(data);

        const user = credentials.find(u => u.user === username);

        if (user) {
            if (user.pass === password) {
                res.json({ resultado: user.rol });
            } else {
                res.status(401).json({ error: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al procesar el login:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud de login' });
    }
};

const updatePassword = async (req, res) => {
    try {
        const { username, currentPassword, newPassword } = req.body;

        // Leer el archivo de credenciales
        const data = await fs.readFile(credentialsPath, 'utf8');
        const credentials = JSON.parse(data);

        // Encontrar el usuario
        const userIndex = credentials.findIndex(u => u.user === username);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar la contraseña actual
        if (credentials[userIndex].pass !== currentPassword) {
            return res.status(401).json({ error: 'Contraseña actual incorrecta' });
        }

        // Actualizar la contraseña
        credentials[userIndex].pass = newPassword;

        // Guardar el archivo actualizado
        await fs.writeFile(credentialsPath, JSON.stringify(credentials, null, 2), 'utf8');

        res.json({ success: true });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud de actualización de contraseña' });
    }
};

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    compareLogin,
    updatePassword
};
