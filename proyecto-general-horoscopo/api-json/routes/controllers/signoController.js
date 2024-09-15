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
        let credentialsPath = path.join(__dirname, '../../db/credentials.json');
        let credentialsData = await fs.readFile(credentialsPath, 'utf-8');
        let credentials = JSON.parse(credentialsData);

        // Busca primero en credentials.json
        let user = credentials[username];

        // Si no encuentra en credentials.json, busca en credentialsadmin.json
        if (!user) {
            credentialsPath = path.join(__dirname, '../../db/credentialsadmin.json');
            credentialsData = await fs.readFile(credentialsPath, 'utf-8');
            credentials = JSON.parse(credentialsData);
            user = credentials[username];
        }

        // Verifica si el usuario existe y si la contraseña antigua es correcta
        if (user && user.password === oldPassword) {
            // Actualiza la contraseña
            user.password = newPassword;
            await fs.writeFile(credentialsPath, JSON.stringify(credentials, null, 2), 'utf-8');
            res.json({ success: true, message: 'Contraseña cambiada exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Nombre de usuario o contraseña antigua incorrectos' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

const createUser = async (req, res) => {
    const { username, password } = req.body;

    console.log('Received data:', { username, password });

    try {
        // Elimina la lógica de selección del archivo y usa siempre credentials.json
        const credentialsPath = path.join(__dirname, '../../db/credentials.json');

        const credentialsData = await fs.readFile(credentialsPath, 'utf-8');
        const credentials = JSON.parse(credentialsData);

        if (credentials[username]) {
            return res.status(400).json({ success: false, message: 'Usuario ya existe' });
        }

        // Guarda el usuario con contraseña, no hay necesidad de especificar roles
        credentials[username] = { password };
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