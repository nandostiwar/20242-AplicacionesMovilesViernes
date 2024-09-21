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

const compareLogin = async (req, res) => {
    const { body } = req;
    const { username, password } = body;
    // console.log("recibi user: " + username)
    // console.log("recibi pass: " + password)

    //leer el archivo de las crdenciales
    //comparar si el user y pass que llego pertenece al admin o user
    let userData = await fs.readFile(path.join(__dirname, '../../db/credenciales.json'), 'utf8');
    userData = JSON.parse(userData);

    for (const user of userData) {
        console.log(user.userId + " " + user.data.password);
        if (user.userId === username && user.data.password === password) {
            console.log("El usuario existe");
            return res.json({ resultado: user.data.rol });
        }
    }
    console.log("El usuario no existe");
    return res.json({ resultado: 'error' });
}

const crearUsuario = async (req, res) => {
    const { body } = req;
    const { username, password, rol } = body;
    console.log("recibi user: " + username + " clave: " + password);

    try {
        if(!username || !password){
            console.log("Faltan datos");
            return res.json({ resultado: 'ausencia' });
        }
        // Leer el archivo JSON existente
        let userData = await fs.readFile(path.join(__dirname, '../../db/credenciales.json'), 'utf8');
        userData = JSON.parse(userData);
        for (const user of userData) {
            if (user.userId === username) {
                console.log("El usuario ya existe");
                return res.json({ resultado: 'error' });
            }
        }

        // Crear el nuevo usuario
        const nuevoUsuario = {
            "userId": username,
            "data": {
                "password": password,
                "rol": rol // Puedes cambiar el rol según sea necesario
            }
        };

        // Agregar el nuevo usuario al array de usuarios
        userData.push(nuevoUsuario);

        // Convertir el array actualizado a JSON
        const nuevoUserDataJson = JSON.stringify(userData, null, 2);

        // Guardar el archivo JSON actualizado
        await fs.writeFile(path.join(__dirname, '../../db/credenciales.json'), nuevoUserDataJson, 'utf8');

        console.log("Usuario creado exitosamente!");
        return res.json({resultado: 'creado'});
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        return res.status(500).send("Error interno del servidor");
    }
};

const cambiarClave = async (req, res) => {
    try {
        const {username, password, newPassword} = req.body;
        if(!username || !password || !newPassword){
            console.log("Faltan datos");
            return res.json({ resultado: 'ausencia' });
        }
        // Leer el archivo JSON existente
        let userData = await fs.readFile(path.join(__dirname, '../../db/credenciales.json'), 'utf8');
        userData = JSON.parse(userData);
        for(const user of userData){
            if(user.userId === username && user.data.password === password){
                user.data.password = newPassword;
                const nuevoUserDataJson = JSON.stringify(userData, null, 2);
                await fs.writeFile(path.join(__dirname, '../../db/credenciales.json'), nuevoUserDataJson, 'utf8');
                console.log("Clave cambiada exitosamente!");
                return res.json({resultado: 'cambiado'});
            }
        }
    } catch (error) {
        console.log("Error al cambiar la clave: ", error);
        return res.status(500).send("Error interno del servidor");
    }
}

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    compareLogin,
    crearUsuario,
    cambiarClave
}