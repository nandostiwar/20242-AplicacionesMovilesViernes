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

///////////////////////////////////////////////  APARTADO DE USUARIOS    ////////////////////////////////////////////////////////////////

const getAlluser = async (req, res)=>{
    const credenciales = await fs.readFile(path.join(__dirname,'../../db/credenciales.json'));
    const credencialesJson = JSON.parse(credenciales)
    res.json(credencialesJson);
}


const compareLogin = async (req, res) => {
    const { username, password } = req.body;

    console.log("recibi user: " + username);
    console.log("recibi pass: " + password);

    if (!username || !password) {
        return res.status(400).json({ resultado: "Faltan credenciales" });
    }

    try {
        const credencialesPath = path.join(__dirname, '../../db/credenciales.json');
        const data = await fs.readFile(credencialesPath, 'utf8');
        const credenciales = JSON.parse(data);

        // Buscar si el usuario y la contraseña coinciden
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
}
//////////////////////////////////////////////////////////////////////////////////////////////

const updateUser = async (req, res)=>{
    const userEditar = req.params.userEditar;
    const { username, password } = req.body;
    const update = await fs.readFile(path.join(__dirname,'../../db/credenciales.json'));
    const objSignos = JSON.parse(update);

    const objUpdate = {
        ...objSignos,
        [userEditar]: textoEditar
    }

    // console.log(objUpdate);
    await fs.writeFile(path.join(__dirname,'../../db/credenciales.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })
}


module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    compareLogin,
    updateUser,
    getAlluser
    //newUser
};