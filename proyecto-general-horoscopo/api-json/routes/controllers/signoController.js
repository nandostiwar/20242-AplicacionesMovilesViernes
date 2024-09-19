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

    try {
        // Leer el archivo de credenciales
        const filePath = path.resolve(__dirname, '../../db/credenciales.json');
        const data = await fs.readFile(filePath, 'utf-8');
        const credentials = JSON.parse(data);

        // Buscar en las credenciales si hay una coincidencia
        const user = credentials.find(c => c.userId === username && c.userPass === password);

        if (user) {
            res.json({
                resultado: user.perfil
            });
        } else {
            res.status(401).json({
                resultado: "Credenciales incorrectas"
            });
        }
    } catch (error) {
        res.status(500).json({
            resultado: "Error en el servidor"
        });
    }
};

const updatePassword = async (req, res) => {
    const { username, newPassword } = req.body; // Recibimos username y newPassword
    const filePath = path.join(__dirname, '../../db/credenciales.json');

    try {
        const allUsers = await fs.readFile(filePath, 'utf-8');
        const objUsers = JSON.parse(allUsers);

        // Encontrar el usuario
        const userIndex = objUsers.findIndex(user => user.userId === username);
        if (userIndex === -1) {
            return res.status(404).json({
                message: "User no encontrado"
            });
        }

        // Actualizamos la contraseña del usuario
        objUsers[userIndex].userPass = newPassword;

        // Guardamos los cambios en el archivo JSON
        await fs.writeFile(filePath, JSON.stringify(objUsers, null, 2), { encoding: 'utf-8' });

        // Enviar respuesta exitosa
        res.json({
            message: "Password ha sido modificado"
        });

    } catch (error) {
        console.error("Error al modificar la contraseña:", error);
        res.status(500).json({
            message: "Error al modificar la contraseña"
        });
    }
};

const addUser = async (req, res) => {
    const { username, password, perfil } = req.body; // Recibimos el username, password y perfil del cuerpo de la solicitud
    const filePath = path.join(__dirname, '../../db/credenciales.json');

    try {
        // Leer el archivo de credenciales
        const allUsers = await fs.readFile(filePath, 'utf-8');
        const objUsers = JSON.parse(allUsers);

        // Verificar si el usuario ya existe
        const userExists = objUsers.some(user => user.userId === username);
        if (userExists) {
            return res.status(400).json({
                message: "El usuario ya existe"
            });
        }

        // Agregar el nuevo usuario
        const newUser = {
            userId: username,
            userPass: password,
            perfil: perfil
        };
        objUsers.push(newUser);

        // Guardar los cambios en el archivo JSON
        await fs.writeFile(filePath, JSON.stringify(objUsers, null, 2), { encoding: 'utf-8' });

        // Responder exitosamente
        res.json({
            message: "Usuario creado exitosamente"
        });

    } catch (error) {
        console.error("Error al agregar el usuario:", error);
        res.status(500).json({
            message: "Error al agregar el usuario"
        });
    }
};


module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    compareLogin,
    updatePassword,
    addUser
}