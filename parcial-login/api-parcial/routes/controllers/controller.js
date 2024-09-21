const fs = require('fs/promises');
const path = require('path');
const users = require('../../db/user');
const admins = require('../../db/admin');

// Rutas para escribir en los archivos user.js y admin.js
const userPath = path.join(__dirname, './db/user.js');
const adminPath = path.join(__dirname, './db/admin.js');

// Comparar login de usuarios y administradores
const compareLogin = (req, res) => {
    const { user, pass } = req.body;

    // Buscar en ambas bases de datos (usuarios y administradores)
    const foundUser = users.find(u => u.user === user && u.pass === pass);
    const foundAdmin = admins.find(a => a.user === user && a.pass === pass);

    if (foundUser) {
        res.status(200).json({ message: 'Eres user', rol: 'user' });
    } else if (foundAdmin) {
        res.status(200).json({ message: 'Eres admin', rol: 'admin' });
    } else {
        res.status(401).json({ error: 'Error al iniciar sesión: usuario o contraseña incorrectos' });
    }
};

// Crear nuevo perfil de usuario o administrador
const newPerfil = async (req, res) => {
    const { user, pass, rol } = req.body;

    // Verificar que el rol sea válido (user o admin)
    if (rol !== 'user' && rol !== 'admin') {
        return res.status(400).json({ error: 'Rol no válido. Debe ser "user" o "admin".' });
    }

    // Verificar que el usuario no exista ya en ninguna de las bases de datos
    const existingUser = users.find(u => u.user === user) || admins.find(a => a.user === user);
    
    if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear un nuevo objeto usuario
    const newUser = { user, pass };

    try {
        // Guardar en la base de datos correspondiente según el rol
        if (rol === 'user') {
            users.push(newUser);
            await fs.writeFile(userPath, `module.exports = ${JSON.stringify(users, null, 2)};`, 'utf8');
        } else if (rol === 'admin') {
            admins.push(newUser);
            await fs.writeFile(adminPath, `module.exports = ${JSON.stringify(admins, null, 2)};`, 'utf8');
        }
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el nuevo usuario' });
    }
};

// Actualizar contraseña
const updatePassword = async (req, res) => {
    const { user, oldPass, newPass } = req.body;

    // Buscar usuario en ambas bases de datos
    let userToUpdate = users.find(u => u.user === user);
    let isAdmin = false;
    
    if (!userToUpdate) {
        userToUpdate = admins.find(a => a.user === user);
        isAdmin = !!userToUpdate;
    }

    // Caso 1: Usuario no encontrado
    if (!userToUpdate) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Caso 2: Contraseña incorrecta
    if (userToUpdate.pass !== oldPass) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Actualizar la contraseña
    userToUpdate.pass = newPass;

    // Guardar los cambios si es un usuario común
    if (!isAdmin) {
        try {
            await fs.writeFile(userPath, `module.exports = ${JSON.stringify(users, null, 2)};`, 'utf8');
            return res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
        } catch (error) {
            return res.status(500).json({ error: 'Error al guardar la nueva contraseña' });
        }
    } else {
        // Si es un admin, actualizar admin.js
        try {
            await fs.writeFile(adminPath, `module.exports = ${JSON.stringify(admins, null, 2)};`, 'utf8');
            return res.status(200).json({ message: 'Contraseña de administrador cambiada exitosamente' });
        } catch (error) {
            return res.status(500).json({ error: 'Error al guardar la nueva contraseña de administrador' });
        }
    }
};

module.exports = {
    compareLogin,
    newPerfil,
    updatePassword
};
