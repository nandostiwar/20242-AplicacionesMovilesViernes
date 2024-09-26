const fs = require('fs/promises');
const path = require('path');
const users = require('../../db/user').default;
const admins = require('../../db/admin').default;

// Rutas para escribir en los archivos user.js y admin.js
const userPath = path.join(__dirname, '../../db/user.js');
const adminPath = path.join(__dirname, '../../db/admin.js');

const getUsers = async () => {
    const users = require(userPath);
    return users;
};

const getAdmins = async () => {
    const admins = require(adminPath);
    return admins;
};

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
const newProfile = async (req, res) => {
    const { user, pass, rol } = req.body;

    // Cargar los datos de los archivos user.js y admin.js
    let users = require(userPath);
    let admins = require(adminPath);

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

    try {
        // Cargar los usuarios y administradores desde los archivos
        let users = await getUsers();
        let admins = await getAdmins();

        // Inicializar banderas
        let isUser = false;
        let isAdmin = false;

        // Buscar primero en la base de datos de usuarios
        let userToUpdate = users.find(u => u.user === user);
        if (userToUpdate) {
            isUser = true;  // Si se encuentra en usuarios, marcar isUser como true
        } else {
            // Si no se encuentra en usuarios, buscar en administradores
            userToUpdate = admins.find(a => a.user === user);
            if (userToUpdate) {
                isAdmin = true;  // Si se encuentra en admins, marcar isAdmin como true
            }
        }

        // Caso 1: Usuario no encontrado en ambas bases de datos
        if (!isUser && !isAdmin) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Caso 2: Contraseña antigua no coincide
        if (userToUpdate.pass !== oldPass) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Caso 3: Actualizar la contraseña
        userToUpdate.pass = newPass;

        // Guardar los cambios si es usuario común
        if (isUser) {
            await fs.writeFile(userPath, JSON.stringify(users, null, 2), 'utf8');
        } else if (isAdmin) {
            // Guardar los cambios si es administrador
            await fs.writeFile(adminPath, JSON.stringify(admins, null, 2), 'utf8');
        }

        // Respuesta de éxito
        res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la contraseña' });
    }
};


module.exports = {
    compareLogin,
    newProfile,
    updatePassword   
};
