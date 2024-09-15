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
        const credentialsPath = path.join(__dirname, '../../db/credentials.json');
        const credentialsData = await fs.readFile(credentialsPath, 'utf-8');
        const credentials = JSON.parse(credentialsData);

        // Verifica si el usuario existe y si la contraseña antigua es correcta
        const user = credentials[username];
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