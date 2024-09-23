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


// Actualizacion de Datos 

///////////////////COMPARAR SI ES USUARIO O ADMINISTRADOR //////////////////
const compareLogin = async (req, res) => {
    const { username, password } = req.body;

    console.log("recibi user: " + username);
    console.log("recibi pass: " + password);

    if (!username || !password) {
        return res.status(400).json({ resultado: "Faltan credenciales" });
    }

    try {
        const usersPath = path.join(__dirname, '../../db/users.json');
        const adminsPath = path.join(__dirname, '../../db/admins.json');

        const [usersData, adminsData] = await Promise.all([
            fs.readFile(usersPath, 'utf8'),
            fs.readFile(adminsPath, 'utf8')
        ]);

        const users = JSON.parse(usersData);
        const admins = JSON.parse(adminsData);

        // Verificar si es usuario
        if (users[username] && users[username].password === password) { // Considera usar bcrypt.compare si usas hashing
            return res.json({ resultado: "user" });
        }

        // Verificar si es admin
        if (admins[username] && admins[username].password === password) { // Considera usar bcrypt.compare si usas hashing
            return res.json({ resultado: "admin" });
        }

        // Si no coincide
        return res.status(401).json({ resultado: "Credenciales incorrectas" });

    } catch (error) {
        console.error("Error leyendo credenciales:", error);
        return res.status(500).json({ resultado: "Error del servidor" });
    }
};


// Actualizacion de Datos //////////////////////////////////////////////////////////////////////////////////

const UpdateData = async (req, res) => {
    const { username, currentPassword, newPassword, userType } = req.body;

    if (!username || !currentPassword || !newPassword || !userType) {
        return res.status(400).json({ success: false, message: "Faltan datos para actualizar." });
    }

    try {
        let credencialesPath;
        if (userType === 'user') {
            credencialesPath = path.join(__dirname, '../../db/users.json');
        } else if (userType === 'admin') {
            credencialesPath = path.join(__dirname, '../../db/admins.json');
        } else {
            return res.status(400).json({ success: false, message: "Tipo de usuario inválido." });
        }

        const data = await fs.readFile(credencialesPath, 'utf8');
        const credenciales = JSON.parse(data);

        if (!credenciales[username]) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado." });
        }

        // Verificar la contraseña actual
        // Si usas bcrypt para hashear contraseñas, descomenta y usa bcrypt.compare
        // const match = await bcrypt.compare(currentPassword, credenciales[username].password);
        // if (!match) {
        //     return res.status(401).json({ success: false, message: "Contraseña actual incorrecta." });
        // }

        // Si no usas bcrypt, compara directamente
        if (credenciales[username].password !== currentPassword) {
            return res.status(401).json({ success: false, message: "Contraseña actual incorrecta." });
        }

        // Actualizar la contraseña
        credenciales[username].password = newPassword; // Considera hashear la contraseña aquí

        await fs.writeFile(credencialesPath, JSON.stringify(credenciales, null, 2), 'utf-8');

        res.json({ success: true, message: "Contraseña actualizada exitosamente." });

    } catch (error) {
        console.error("Error actualizando credenciales:", error);
        res.status(500).json({ success: false, message: "Error del servidor al actualizar las credenciales." });
    }
};


const registerUser = async (req, res) => {
    const { username, password, userType } = req.body;
  
    if (!username || !password || !userType) {
      return res.status(400).json({ message: "Faltan datos para registrar." });
    }
  
    try {
      let filePath;
      if (userType === 'user') {
        filePath = path.join(__dirname, '../../db/users.json');
      } else if (userType === 'admin') {
        filePath = path.join(__dirname, '../../db/admins.json');
      } else {
        return res.status(400).json({ message: "Tipo de usuario inválido." });
      }
  
      const data = await fs.readFile(filePath, 'utf8');
      const credenciales = JSON.parse(data);
  
      if (credenciales[username]) {
        return res.status(400).json({ message: "El usuario ya existe." });
      }
  
      credenciales[username] = { password };
  
      await fs.writeFile(filePath, JSON.stringify(credenciales, null, 2), 'utf-8');
  
      res.status(201).json({ message: "Usuario registrado exitosamente." });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({ message: "Error del servidor al registrar el usuario." });
    }
  };

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    compareLogin,
    UpdateData,
    registerUser
};