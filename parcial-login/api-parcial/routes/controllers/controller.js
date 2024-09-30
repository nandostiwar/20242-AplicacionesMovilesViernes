const fs = require('fs/promises');
const path = require('path');

// Rutas de los archivos de usuarios y administradores
const userPath = path.join(__dirname, '../../db/user.js');
const adminPath = path.join(__dirname, '../../db/admin.js');

// Función para leer los datos desde un archivo
const readData = async (filePath) => {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data.replace('module.exports = ', '').slice(0, -1));
};

// Comparar login de usuarios y administradores
const compareLogin = async (req, res) => {
    const { user, pass } = req.body;

    try {
        const users = await readData(userPath);
        const admins = await readData(adminPath);

        const foundUser = users.find(u => u.user === user && u.pass === pass);
        const foundAdmin = admins.find(a => a.user === user && a.pass === pass);

        if (foundUser) {
            res.status(200).json({ message: 'Eres user', rol: 'user' });
        } else if (foundAdmin) {
            res.status(200).json({ message: 'Eres admin', rol: 'admin' });
        } else {
            res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
};

// Crear nuevo perfil
const newProfile = async (req, res) => {
    const { user, pass, rol } = req.body;

    try {
        const users = await readData(userPath);
        const admins = await readData(adminPath);

        const existingUser = users.find(u => u.user === user) || admins.find(a => a.user === user);
        if (existingUser) return res.status(400).json({ error: 'El usuario ya existe' });

        const newUser = { user, pass };

        if (rol === 'user') {
            users.push(newUser);
            await fs.writeFile(userPath, `module.exports = ${JSON.stringify(users, null, 2)};`);
        } else if (rol === 'admin') {
            admins.push(newUser);
            await fs.writeFile(adminPath, `module.exports = ${JSON.stringify(admins, null, 2)};`);
        }

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// Actualizar contraseña
const updatePassword = async (req, res) => {
    const { user, oldPass, newPass } = req.body;

    try {
        const users = await readData(userPath);
        const admins = await readData(adminPath);

        let userToUpdate = users.find(u => u.user === user);
        let filePath = userPath;

        if (!userToUpdate) {
            userToUpdate = admins.find(a => a.user === user);
            filePath = adminPath;
        }

        if (!userToUpdate) return res.status(404).json({ error: 'Usuario no encontrado' });
        if (userToUpdate.pass !== oldPass) return res.status(401).json({ error: 'Contraseña incorrecta' });

        userToUpdate.pass = newPass;
        const updatedData = filePath === userPath ? users : admins;

        await fs.writeFile(filePath, `module.exports = ${JSON.stringify(updatedData, null, 2)};`);
        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la contraseña' });
    }
};

module.exports = {
    compareLogin,
    newProfile,
    updatePassword   
};
