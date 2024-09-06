const fs = require('fs/promises');
const path = require('path');

const getAllSignos = async (req, res)=>{
    const signo = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const signosJson = JSON.parse(signo)
    res.json(signosJson);
}

const getOneSigno = async (req, res)=>{
    const {categoriaU, signoU} = req.params;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result1 = objSignos[categoriaU][signoU];
    // const result =result1[oneSigno]

    console.log(categoriaU)
    console.log(signoU)
    res.json(result1)
}

const updateSigno = async (req, res)=>{
    const {categoria,signoEditar} = req.params;
    const {textoEditar} = req.body;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    
    objSignos[categoria][signoEditar] = textoEditar;
    const objUpdate = { ...objSignos };
    await fs.writeFile(path.join(__dirname, '../../db/signos.json'), JSON.stringify(objSignos, null, 2), 'utf-8');
    

 

    res.json({
        message: "Updated"
    })
}

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno
}