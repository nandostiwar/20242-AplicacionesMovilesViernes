const fs = require('fs/promises');
const path = require('path');

//?FUNCION PARA OBTENER TODOS LOS SIGNOS
exports.getAllSignos = async (req, res) => {
    const signo = await fs.readFile(path.join(__dirname, '../db/signos.json'));
    const signosJson = JSON.parse(signo)
    res.json(signosJson);
}

//?FUNCION PARA OBTENER UN SIGNO EN ESPECIFICO
exports.getOneSigno = async (req, res) => {
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname, '../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result)
}
//?FUNCION PARA ACTUALIZAR SIGNOS
exports.updateSigno = async (req, res) => {
    const signoEditar = req.params.signoEditar;
    const { textoEditar } = req.body;
    const allSignos = await fs.readFile(path.join(__dirname, '../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [signoEditar]: textoEditar
    }

    
    await fs.writeFile(path.join(__dirname, '../db/signos.json'), JSON.stringify(objUpdate, null, 2), { encoding: 'utf-8' })

    res.json({
        message: "Updated"
    })
}


