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

const compareLogin = async (req, res)=>{
    const {body}= req;
    const{username, password}= body;
    console.log("recibi user: " + username)
    console.log("recibi pass: " + password)

    try {
        // Leer las credenciales
        const data = await fs.readFile(path.join(__dirname,'../../db/credenciales.json'));
        const credentials = JSON.parse(data);

        // Comparar las credenciales
        if (username === credentials.userId && password === credentials.userPass) {
            return res.json({ resultado: "user" });
        } else if (username === credentials.adminId && password === credentials.adminPass) {
            return res.json({ resultado: "admin" });
        } else {
            return res.json({ resultado: "Credenciales inválidas" });
        }
    } catch (error) {
        console.error("Error leyendo el archivo de credenciales:", error);
        return res.status(500).json({ resultado: "Error interno del servidor" });
    }
}

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    compareLogin
}