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

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    compareLogin
}