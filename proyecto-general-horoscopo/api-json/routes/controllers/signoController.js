const fs = require('fs/promises');
const path = require('path');

const getAllSignos = async (req, res)=>{
    const signo = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const signosJson = JSON.parse(signo)
    res.json(signosJson);
}


const getOneSigno = async (req, res) => {
    const signo = req.params.signo;
    const perfil = req.params.perfil;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const result = objSignos[signo] ? objSignos[signo][perfil] : null;

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: "Signo o perfil no encontrado." });
    }
};

const updateSigno = async (req, res) => {
    const signoEditar = req.params.signoEditar;
    const { perfil, textoEditar } = req.body; // Recibe el perfil a editar
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    // Verifica si el signo y el perfil existen antes de actualizar
    if (objSignos[signoEditar] && objSignos[signoEditar][perfil]) {
        objSignos[signoEditar][perfil] = textoEditar; // Actualiza el perfil específico

        // Guarda el archivo actualizado
        await fs.writeFile(path.join(__dirname, '../../db/signos.json'), JSON.stringify(objSignos, null, 2), { encoding: 'utf-8' });

        res.json({ message: "Actualizado correctamente" });
    } else {
        res.status(404).json({ message: "Signo o perfil no encontrado para actualizar." });
    }
};

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno
}