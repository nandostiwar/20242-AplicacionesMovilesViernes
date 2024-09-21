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
        message: "Actualizado"
    })
}

const validarCredenciales = async (req, res)=>{
   //const {categoria,signoEditar} = req.params;
   
   const {username,password} = req.body;
   try{
    
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/credenciales.json'));
    const objSignos = JSON.parse(allSignos);

 
    
    if (objSignos.user[username] && objSignos.user[username] === password) {
        return res.status(200).json("user");
    } else if (objSignos.admin[username] && objSignos.admin[username] === password) {
        return res.status(200).json("admin");
    } else {
        
        return res.status(401).json("usuario y/o Contraseña incorrecto");
    }
} catch (error) {
    console.error('Error al leer las credenciales:', error);
    return res.status(500).json({ message: "Upps no se pudo conectar al servidor" });
}

}

const registroCredenciales = async (req, res)=>{
  
    const {rol,...addcredenciales} = req.body;
    const allcredencial = await fs.readFile(path.join(__dirname,'../../db/credenciales.json'));
    const objcredencial = JSON.parse(allcredencial);

    const {user} = addcredenciales;
    const {password} = addcredenciales;

  

    
    if (objcredencial[rol][user] === undefined){

        objcredencial[rol][user]=password
        const objUpdate = { ...objcredencial };
        await fs.writeFile(path.join(__dirname, '../../db/credenciales.json'), JSON.stringify(objUpdate, null, 2), 'utf-8');
        return res.json("Se ha creado el usuario de manera exitosa! ")
    }
    
    if(objcredencial.user[user]){

        return res.json("El usuario: "+[user]+", ya existe ")

    }
        
    if(objcredencial.admin[user]){
            
        return res.json("El administrador: "+[user]+", ya existe ")
    } 
    

}

const editarContrasena = async (req, res)=>{
  
    const {rolD,...newpassword} = req.body;
    const allcredencial = await fs.readFile(path.join(__dirname,'../../db/credenciales.json'));
    const objedicrede = JSON.parse(allcredencial);

    const {usuario} = newpassword
    const {password} = newpassword

    // console.log(usuario);
    // console.log(password);
    // console.log(rolD);
    const valida = objedicrede.user[usuario];
    console.log(valida);

    if(objedicrede[rolD][usuario] === undefined){

        console.log("ingreso")
        return res.json("El usuario no existe, crea uno nuevo")
    }
    
    if(objedicrede[rolD][usuario]){
        
        console.log("ingreso se ha modifico")
        objedicrede[rolD][usuario] = password;

        const objUpdate = { ...objedicrede };
        await fs.writeFile(path.join(__dirname, '../../db/credenciales.json'), JSON.stringify(objUpdate, null, 2), 'utf-8');
        return res.json("Se ha modificado")
    }

  

}

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    validarCredenciales,
    registroCredenciales,
    editarContrasena
}