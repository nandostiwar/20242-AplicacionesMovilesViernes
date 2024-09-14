const fs = require('fs/promises');
const path = require('path');

const getAllSignos = async (req, res) => {
    const signo = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const signosJson = JSON.parse(signo)
    res.json(signosJson);
}

const getOneSigno = async (req, res) => {
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result)
}

const updateSigno = async (req, res) => {
    const signoEditar = req.params.signoEditar;
    const { textoEditar } = req.body;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [signoEditar]: textoEditar
    }

    // console.log(objUpdate);
    await fs.writeFile(path.join(__dirname, '../../db/signos.json'), JSON.stringify(objUpdate, null, 2), { encoding: 'utf-8' })

    res.json({
        message: "Updated"
    })
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Intenta primero buscar en credentials.json (usuarios normales)
        let credentialsPath = path.join(__dirname, '../../db/credentials.json');
        let credentialsData = await fs.readFile(credentialsPath, 'utf-8');
        let credentials = JSON.parse(credentialsData);

        let user = credentials[username];

        // Si no encuentra en credentials.json, busca en credentialsadmin.json (administradores)
        if (!user) {
            credentialsPath = path.join(__dirname, '../../db/credentialsadmin.json');
            credentialsData = await fs.readFile(credentialsPath, 'utf-8');
            credentials = JSON.parse(credentialsData);
            user = credentials[username];
        }

        if (user && user.password === password) {
            const response = { success: true, role: user.role, message: 'Datos ingresados correctamente' };
            console.log('Response:', response);
            res.json(response);
        } else {
            const response = { success: false, message: 'Datos incorrectos' };
            console.log('Response:', response);
            res.json(response);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};
const changePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    try {
        // Definir las rutas a los archivos de credenciales
        const userCredentialsPath = path.join(__dirname, '../../db/credentials.json');
        const adminCredentialsPath = path.join(__dirname, '../../db/credentialsadmin.json');

        // Leer y parsear ambos archivos
        const userCredentialsData = await fs.readFile(userCredentialsPath, 'utf-8');
        const adminCredentialsData = await fs.readFile(adminCredentialsPath, 'utf-8');

        const userCredentials = JSON.parse(userCredentialsData);
        const adminCredentials = JSON.parse(adminCredentialsData);

        let user;
        let credentialsPath;

        // Verifica si el usuario es un usuario común o un administrador
        if (userCredentials[username]) {
            user = userCredentials[username];
            credentialsPath = userCredentialsPath;
        } else if (adminCredentials[username]) {
            user = adminCredentials[username];
            credentialsPath = adminCredentialsPath;
        }

        // Si el usuario no existe
        if (!user) {
            return res.status(400).json({ success: false, message: 'Nombre de usuario no encontrado' });
        }

        // Verificar la contraseña antigua
        if (user.password === oldPassword) {
            // Actualiza la contraseña
            user.password = newPassword;

            // Guardar los cambios en el archivo correcto
            const updatedCredentials = credentialsPath === userCredentialsPath ? userCredentials : adminCredentials;
            await fs.writeFile(credentialsPath, JSON.stringify(updatedCredentials, null, 2), 'utf-8');

            return res.json({ success: true, message: 'Contraseña cambiada exitosamente' });
        } else {
            return res.status(400).json({ success: false, message: 'Contraseña antigua incorrecta' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

const createUser = async (req, res) => {
    const { username, password } = req.body;

    console.log('Received data:', { username, password }); // Añade este registro para verificar datos recibidos

    try {
        const credentialsPath = path.join(__dirname, '../../db/credentials.json');
        const credentialsData = await fs.readFile(credentialsPath, 'utf-8');
        const credentials = JSON.parse(credentialsData);

        if (credentials[username]) {
            return res.status(400).json({ success: false, message: 'Usuario ya existe' });
        }

        credentials[username] = { password, role: 'user' }; // Establece el rol como 'user'
        await fs.writeFile(credentialsPath, JSON.stringify(credentials, null, 2), 'utf-8');
        res.json({ success: true, message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

module.exports = {
    getAllSignos,
    login,
    getOneSigno,
    changePassword,
    updateSigno,
    createUser
}