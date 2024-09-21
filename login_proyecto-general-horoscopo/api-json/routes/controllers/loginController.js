const fs = require('fs/promises');
const path = require('path');

const getAllUser = async (req, res)=>{
    const login = await fs.readFile(path.join(__dirname,'../../db/credenciales.json'));
    const loginJson = JSON.parse(login)
    res.json(loginJson);
}


const getOneSigno = async (req, res)=>{
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/credenciales.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result)
}
/*
const updateSigno = async (req, res)=>{
    const signoEditar = req.params.signoEditar;
    const {textoEditar} = req.body;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/credenciales.json'));
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
*/

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno
}