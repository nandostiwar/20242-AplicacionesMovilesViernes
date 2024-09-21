const fs = require('fs/promises');
const path = require('path');

const getAllSignos = async (req, res) => {
    const signo = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const signosJson = JSON.parse(signo);
    res.json(signosJson);
};

const getOneSigno = async (req, res) => {
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result);
};

const updateSigno = async (req, res) => {
    const signoEditar = req.params.signoEditar;
    const { textoEditar } = req.body;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [signoEditar]: textoEditar
    };

    await fs.writeFile(path.join(__dirname, '../../db/signos.json'), JSON.stringify(objUpdate, null, 2), { encoding: 'utf-8' });
    res.json({ message: "Updated" });
};

const compareLogin = async (req, res) => {
    const { body } = req;
    const { username, password } = body;
    console.log("recibi user: " + username);
    console.log("recibi pass: " + password);

    const usuariosPath = path.join(__dirname, '../../db/usuarios.json');
    const adminsPath = path.join(__dirname, '../../db/admins.json');

    const usuarios = JSON.parse(await fs.readFile(usuariosPath));
    const admins = JSON.parse(await fs.readFile(adminsPath));

    if (usuarios[username] === password) {
        return res.json({ resultado: "user" });
    } else if (admins[username] === password) {
        return res.json({ resultado: "admin" });
    } else {
        return res.json({ resultado: "error" });
    }
};

const changePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    const usuariosPath = path.join(__dirname, '../../db/usuarios.json');
    const adminsPath = path.join(__dirname, '../../db/admins.json');

    const usuarios = JSON.parse(await fs.readFile(usuariosPath));
    const admins = JSON.parse(await fs.readFile(adminsPath));

    if (usuarios[username] !== undefined) {
        if (usuarios[username] === oldPassword) {
            usuarios[username] = newPassword;
            await fs.writeFile(usuariosPath, JSON.stringify(usuarios, null, 2));
            return res.json({ message: "Contraseña cambiada exitosamente." });
        } else {
            return res.json({ message: "La contraseña antigua es incorrecta." });
        }
    } else if (admins[username] !== undefined) {
        if (admins[username] === oldPassword) {
            admins[username] = newPassword;
            await fs.writeFile(adminsPath, JSON.stringify(admins, null, 2));
            return res.json({ message: "Contraseña cambiada exitosamente." });
        } else {
            return res.json({ message: "La contraseña antigua es incorrecta." });
        }
    } else {
        return res.json({ message: "El usuario no se encuentra en la base de datos." });
    }
};

const addUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const usuariosPath = path.join(__dirname, '../../db/usuarios.json');
        const adminsPath = path.join(__dirname, '../../db/admins.json');

        let usuarios = JSON.parse(await fs.readFile(usuariosPath));
        let admins = JSON.parse(await fs.readFile(adminsPath));

        if (role === 'user') {
            if (usuarios[username]) {
                return res.json({ message: "El usuario ya existe." });
            }
            usuarios[username] = password; // Agregar nuevo usuario
            await fs.writeFile(usuariosPath, JSON.stringify(usuarios, null, 2));
            return res.json({ message: "Usuario agregado exitosamente." });
        } else if (role === 'admin') {
            if (admins[username]) {
                return res.json({ message: "El administrador ya existe." });
            }
            admins[username] = password; // Agregar nuevo administrador
            await fs.writeFile(adminsPath, JSON.stringify(admins, null, 2));
            return res.json({ message: "Administrador agregado exitosamente." });
        } else {
            return res.json({ message: "Rol no válido." });
        }
    } catch (error) {
        console.error("Error al agregar el usuario:", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    compareLogin,
    changePassword,
    addUser
};
