const fs = require('fs/promises');
const path = require('path');

const getAllSignos = async (req, res)=>{
    const signo = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const signosJson = JSON.parse(signo)
    res.json(signosJson);
}

const getOneSigno = async (req, res)=>{
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result)
}

const updateSigno = async (req, res)=>{
    const signoEditar = req.params.signoEditar;
    const {textoEditar} = req.body;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [signoEditar]: textoEditar
    }

    // console.log(objUpdate);
    await fs.writeFile(path.join(__dirname,'../../db/signos.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })
}

const compareLogin = async (req, res) => {
    const { body } = req;
    const { username, password } = body;

    console.log("Recibí user: " + username);
    console.log("Recibí pass: " + password);

    try {
        // Leer las credenciales
        const data = await fs.readFile(path.join(__dirname, '../../db/credenciales.json'), 'utf-8');
        const credentials = JSON.parse(data);

        // Verificar si el username y password coinciden con los del admin
        if (username === credentials.adminId && password === credentials.adminPass) {
            return res.json({ resultado: "admin" });
        }

        // Verificar si el username y password coinciden con los del usuario estático
        if (username === credentials.userId && password === credentials.userPass) {
            return res.json({ resultado: "user" });
        }

        // Verificar en la lista de usuarios
        const user = credentials.users.find(u => u.username === username && u.password === password);

        if (user) {
            return res.json({ resultado: "user" });
        }

        // Si no se encontró el usuario o la contraseña no coinciden
        return res.json({ resultado: "Credenciales inválidas" });

    } catch (error) {
        console.error("Error leyendo el archivo de credenciales:", error);
        return res.status(500).json({ resultado: "Error interno del servidor" });
    }
};


const updatepassword = async (req, res) => {
    const { body } = req;
    const { username, password, update } = body;

    console.log("Recibí user: " + username);
    console.log("Recibí pass: " + password);
    console.log("Nuevo pass: " + update);

    try {
        // Leer las credenciales
        const data = await fs.readFile(path.join(__dirname, '../../db/credenciales.json'), 'utf-8');
        const credentials = JSON.parse(data);

        // Actualizar la contraseña del admin si coincide
        if (username === credentials.adminId && password === credentials.adminPass) {
            credentials.adminPass = update;
            console.log("Contraseña de admin actualizada");
        }
        // Actualizar la contraseña del usuario estático
        else if (username === credentials.userId && password === credentials.userPass) {
            credentials.userPass = update;
            console.log("Contraseña de usuario estático actualizada");
        }
        // Buscar al usuario en la lista de usuarios
        else {
            const userIndex = credentials.users.findIndex(u => u.username === username && u.password === password);

            if (userIndex !== -1) {
                credentials.users[userIndex].password = update;
                console.log("Contraseña del usuario actualizada");
            } else {
                // Credenciales inválidas
                return res.json({ resultado: "Credenciales inválidas" });
            }
        }

        // Guardar las credenciales actualizadas en el archivo JSON
        await fs.writeFile(path.join(__dirname, '../../db/credenciales.json'), JSON.stringify(credentials, null, 2), 'utf-8');

        // Respuesta exitosa
        return res.json({ resultado: "Contraseña actualizada correctamente" });

    } catch (error) {
        console.error("Error leyendo o escribiendo el archivo de credenciales:", error);
        return res.status(500).json({ resultado: "Error interno del servidor" });
    }
};


const crearuser = async (req, res) => {
    const { body } = req;
    const { username, password } = body;

    console.log("Recibí user: " + username);
    console.log("Recibí pass: " + password);

    try {
        // Leer las credenciales actuales
        const data = await fs.readFile(path.join(__dirname, '../../db/credenciales.json'), 'utf-8');
        const credentials = JSON.parse(data);

        // Verificar si el usuario ya existe
        if (username === credentials.userId || username === credentials.adminId) {
            return res.json({ resultado: "El usuario ya existe" });
        }

        // Crear un nuevo usuario (puedes modificar para múltiples usuarios, si es necesario)
        if (!credentials.users) {
            credentials.users = [];  // Crear el array si no existe
        }

        // Agregar el nuevo usuario al array de usuarios
        credentials.users.push({
            username: username,
            password: password
        });

        console.log("Nuevo usuario creado:", { username, password });

        // Guardar las credenciales actualizadas en el archivo JSON
        await fs.writeFile(path.join(__dirname, '../../db/credenciales.json'), JSON.stringify(credentials, null, 2), 'utf-8');

        // Respuesta exitosa
        return res.json({ resultado: "Usuario creado correctamente" });

    } catch (error) {
        console.error("Error leyendo o escribiendo el archivo de credenciales:", error);
        return res.status(500).json({ resultado: "Error interno del servidor" });
    }
};


module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    compareLogin,
    updatepassword,
    crearuser
    
}