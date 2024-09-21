const fs = require('fs/promises');
const path = require('path');

const getAllSignos = async (req, res) => {
    try {
        const signo = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
        const signosJson = JSON.parse(signo);
        res.json(signosJson);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los signos' });
    }
};

const getOneSigno = async (req, res) => {
    try {
        const oneSigno = req.params.signo;
        const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
        const objSignos = JSON.parse(allSignos);
        const result = objSignos[oneSigno];

        if (!result) {
            return res.status(404).json({ message: 'Signo no encontrado' });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el signo' });
    }
};

const updateSigno = async (req, res) => {
    try {
        const signoEditar = req.params.signoEditar;
        const { textoEditar } = req.body;
        const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
        const objSignos = JSON.parse(allSignos);

        const objUpdate = {
            ...objSignos,
            [signoEditar]: textoEditar
        };

        await fs.writeFile(path.join(__dirname, '../../db/signos.json'), JSON.stringify(objUpdate, null, 2), { encoding: 'utf-8' });

        res.json({ message: "Signo actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el signo' });
    }
};

const compareLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [adminsData, usersData] = await Promise.all([
            fs.readFile(path.join(__dirname, '../../db/admin.json')),
            fs.readFile(path.join(__dirname, '../../db/usuarios.json'))
        ]);

        const admins = JSON.parse(adminsData);
        const users = JSON.parse(usersData);

        const user = users.find(u => u.username === username && u.password === password);
        const admin = admins.find(a => a.username === username && a.password === password);

        if (user) {
            res.json({ resultado: "user" });
        } else if (admin) {
            res.json({ resultado: "admin" });
        } else {
            res.status(401).json({ resultado: "invalid", message: "Nombre de usuario o contraseña incorrectos" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al validar las credenciales' });
    }
};

const cambiarPassword = async (req, res) => {
    const { username, newPassword } = req.body;

    try {
        const [adminsData, usersData] = await Promise.all([
            fs.readFile(path.join(__dirname, '../../db/admin.json')),
            fs.readFile(path.join(__dirname, '../../db/usuarios.json'))
        ]);

        const admins = JSON.parse(adminsData);
        const users = JSON.parse(usersData);
        let userUpdated = false;
        let userType = '';

        const userIndex = users.findIndex(u => u.username === username);
        const adminIndex = admins.findIndex(a => a.username === username);

        if (userIndex !== -1) {
            users[userIndex].password = newPassword;  
            userUpdated = true;
            userType = 'user';
        } else if (adminIndex !== -1) {
            admins[adminIndex].password = newPassword;  
            userUpdated = true;
            userType = 'admin';
        }

        if (userUpdated) {
            await fs.writeFile(path.join(__dirname, '../../db/usuarios.json'), JSON.stringify(users, null, 2), { encoding: 'utf-8' });
            await fs.writeFile(path.join(__dirname, '../../db/admin.json'), JSON.stringify(admins, null, 2), { encoding: 'utf-8' });
            res.json({ message: "Contraseña actualizada correctamente", userType });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar la contraseña' });
    }
};

const createUserOrAdmin = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Faltan datos necesarios' });
    }

    try {
        let filePath;
        let userData;

        if (role === 'admin') {
            filePath = path.join(__dirname, '../../db/admin.json');
        } else if (role === 'user') {
            filePath = path.join(__dirname, '../../db/usuarios.json');
        } else {
            return res.status(400).json({ message: 'Rol no válido' });
        }

        const data = await fs.readFile(filePath, 'utf-8');
        userData = data ? JSON.parse(data) : [];

        if (!Array.isArray(userData)) {
            userData = [];
        }

        const userExists = userData.some(user => user.username === username);

        if (userExists) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }

        const newUser = { username, password };
        userData.push(newUser);

        await fs.writeFile(filePath, JSON.stringify(userData, null, 2), 'utf-8');
        res.status(201).json({ message: `Usuario ${role} creado exitosamente` });

    } catch (error) {
        console.error('Error en createUserOrAdmin:', error);
        res.status(500).json({ message: 'Error al crear el usuario o admin' });
    }
};

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    compareLogin,
    cambiarPassword,
    createUserOrAdmin
};
