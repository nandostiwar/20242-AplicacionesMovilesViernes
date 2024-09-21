const fs = require('fs/promises');
const path = require('path');
const usersFilePath = path.join(__dirname, '../../db/credenciales.json');

async function getAllSignos(req, res) {
    const signo = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const signosJson = JSON.parse(signo);
    res.json(signosJson);
}

const getOneSigno = async (req, res) => {
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result);
}

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

    res.json({
        message: "Updated"
    });
}

const compareLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const credencialesPath = path.join(__dirname, '../../db/credenciales.json');
        const data = await fs.readFile(credencialesPath, 'utf8');
        const credenciales = JSON.parse(data);

        let userType = null;
        for (const [type, creds] of Object.entries(credenciales)) {
            if (creds.username === username && creds.password === password) {
                userType = type;
                break;
            }
        }

        if (userType) {
            return res.json({ resultado: userType });
        } else {
            return res.status(401).json({ resultado: "Credenciales incorrectas" });
        }
    } catch (error) {
        console.error("Error leyendo credenciales:", error);
        return res.status(500).json({ resultado: "Error del servidor" });
    }
};

// Actualizar de usuario

const updateUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ resultado: "Por favor, complete todos los campos." });
    }

    try {
        const credencialesPath = path.join(__dirname, '../../db/credenciales.json');
        const data = await fs.readFile(credencialesPath, 'utf8');
        const credenciales = JSON.parse(data);

        if (credenciales.user && credenciales.user.username === username) {
            return res.status(409).json({ resultado: "El usuario ya existe." });
        }

        credenciales.user = { username, password };

        await fs.writeFile(credencialesPath, JSON.stringify(credenciales, null, 2), { encoding: 'utf-8' });

        return res.json({ resultado: "Registro exitoso" });
    } catch (error) {
        console.error("Error registrando usuario:", error);
        return res.status(500).json({ resultado: "Error del servidor" });
    }
};

//registro de un nuevo usuario -----------------------------------------------------------------------------------

// Función para leer los usuarios desde el archivo JSON
const readUsersFromFile = () => {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
};

// Función para escribir los usuarios en el archivo JSON
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

// Controlador para registrar un nuevo usuario
const registerUser = (req, res) => {
    const { username, password, role } = req.body;

    // Validar si los campos están vacíos
    if (!username || !password || !role) {
        return res.status(400).json({ resultado: 'error', mensaje: 'Por favor, complete todos los campos.' });
    }

    // Leer los usuarios existentes
    const users = readUsersFromFile();

    // Verificar si el usuario ya existe
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ resultado: 'error', mensaje: 'El usuario ya existe.' });
    }

    // Agregar el nuevo usuario
    const newUser = { username, password, role };
    users.push(newUser);

    // Escribir los usuarios actualizados en el archivo JSON
    writeUsersToFile(users);

    return res.status(201).json({ resultado: 'success', mensaje: 'Registro exitoso.' });
};


module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    compareLogin,
    updateUser,
    registerUser
};
