const fs = require("fs/promises");
const path = require("path");

//FUNCION PARA OBTENER TODOS LOS SIGNOS
const getAllSignos = async (req, res) => {
  const signo = await fs.readFile(path.join(__dirname, "../../db/signos.json"));
  const signosJson = JSON.parse(signo);
  res.json(signosJson);
};
//FUNCION PARA OBTENER UN SIGNO
const getOneSigno = async (req, res) => {
  const oneSigno = req.params.signo;
  const allSignos = await fs.readFile(
    path.join(__dirname, "../../db/signos.json")
  );
  const objSignos = JSON.parse(allSignos);
  const result = objSignos[oneSigno];
  res.json(result);
};
//FUNCION PARA OBTENER PARA ACTUALIZAR SIGNOS
const updateSigno = async (req, res) => {
  const signoEditar = req.params.signoEditar;
  const { textoEditar } = req.body;
  const allSignos = await fs.readFile(
    path.join(__dirname, "../../db/signos.json")
  );
  const objSignos = JSON.parse(allSignos);

  const objUpdate = {
    ...objSignos,
    [signoEditar]: textoEditar,
  };

  // console.log(objUpdate);
  await fs.writeFile(
    path.join(__dirname, "../../db/signos.json"),
    JSON.stringify(objUpdate, null, 2),
    { encoding: "utf-8" }
  );

  res.json({
    message: "Updated",
  });
};

//FUNCION PARA ACTUALIZAR LA CONTRASEÑA DEL USUARIO
const updatePassword = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body; // Recibimos username, currentPassword y newPassword

  const usersFilePath = path.join(__dirname, "../../db/userCredenciales.json"); // Ruta del archivo de usuarios
  const adminsFilePath = path.join(
    __dirname,
    "../../db/adminCredenciales.json"
  ); // Ruta del archivo de administradores

  try {
    // Leer usuarios
    const usersData = await fs.readFile(usersFilePath, "utf-8");
    const users = JSON.parse(usersData);

    // Buscar usuario
    const userIndex = users.findIndex((user) => user.userId === username);
    if (userIndex !== -1) {
      // Verificar la contraseña actual
      if (users[userIndex].userPass !== currentPassword) {
        return res
          .status(401)
          .json({ message: "La contraseña actual es incorrecta." });
      }

      // Actualizamos la contraseña del usuario
      users[userIndex].userPass = newPassword;

      // Guardamos los cambios en el archivo JSON
      await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), {
        encoding: "utf-8",
      });

      return res.json({ message: "Password ha sido modificado" });
    }

    // Si no se encontró en usuarios, leer administradores
    const adminsData = await fs.readFile(adminsFilePath, "utf-8");
    const admins = JSON.parse(adminsData);

    // Buscar administrador
    const adminIndex = admins.findIndex((admin) => admin.userId === username);
    if (adminIndex !== -1) {
      // Verificar la contraseña actual
      if (admins[adminIndex].userPass !== currentPassword) {
        return res
          .status(401)
          .json({ message: "La contraseña actual es incorrecta." });
      }

      // Actualizamos la contraseña del administrador
      admins[adminIndex].userPass = newPassword;

      // Guardamos los cambios en el archivo JSON
      await fs.writeFile(adminsFilePath, JSON.stringify(admins, null, 2), {
        encoding: "utf-8",
      });

      return res.json({ message: "Password ha sido modificado" });
    }

    // Si no se encontró ni en usuarios ni en administradores
    return res.status(404).json({ message: "User no encontrado" });
  } catch (error) {
    console.error("Error al modificar la contraseña:", error);
    return res
      .status(500)
      .json({ message: "Error al modificar la contraseña" });
  }
};

//FUNCION PARA CREAR UN NUEVO USUARIO
const addUser = async (req, res) => {
  const { username, password, perfil } = req.body;
  let filePath;

  // Define la ruta del archivo según el perfil
  if (perfil === "admin") {
    filePath = path.join(__dirname, "../../db/adminCredenciales.json");
  } else if (perfil === "user") {
    filePath = path.join(__dirname, "../../db/userCredenciales.json");
  } else {
    return res.status(400).json({
      message: "Perfil no válido. Debe ser 'admin' o 'user'.",
    });
  }

  if (!username || !password || !perfil) {
    return res.status(400).json({
      message: "Todos los campos son requeridos",
    });
  }

  try {
    const allUsers = await fs.readFile(filePath, "utf-8");
    const objUsers = JSON.parse(allUsers || "[]"); // Inicializa como un array vacío si el archivo está vacío

    const userExists = objUsers.some((user) => user.userId === username);
    if (userExists) {
      return res.status(400).json({
        message: "El usuario ya existe",
      });
    }

    const newUser = {
      userId: username,
      userPass: password, // Considera usar bcrypt para almacenar contraseñas
      perfil: perfil,
    };
    objUsers.push(newUser);

    await fs.writeFile(filePath, JSON.stringify(objUsers, null, 2), {
      encoding: "utf-8",
    });

    res.json({
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    console.error("Error al agregar el usuario:", error);
    res.status(500).json({
      message: "Error al agregar el usuario",
    });
  }
};

//FUNCION PARA VERIFICAR EL LOGIN
const compareLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Leer credenciales de ambos archivos
    const adminPath = path.resolve(
      __dirname,
      "../../db/adminCredenciales.json"
    );
    const userPath = path.resolve(__dirname, "../../db/userCredenciales.json");

    const adminData = await fs.readFile(adminPath, "utf-8");
    const userData = await fs.readFile(userPath, "utf-8");

    const adminCredentials = JSON.parse(adminData);
    const userCredentials = JSON.parse(userData);

    // Buscar en las credenciales si hay una coincidencia
    const adminUser = adminCredentials.find(
      (c) => c.userId === username && c.userPass === password
    );
    if (adminUser) {
      return res.json({ resultado: "admin" });
    }

    const userUser = userCredentials.find(
      (c) => c.userId === username && c.userPass === password
    );
    if (userUser) {
      return res.json({ resultado: "user" });
    }

    // Si no hay coincidencias
    res.status(401).json({ resultado: "Credenciales incorrectas" });
  } catch (error) {
    res.status(500).json({ resultado: "Error en el servidor" });
  }
};
module.exports = {
  getAllSignos,
  getOneSigno,
  updateSigno,
  compareLogin,
  updatePassword,
  addUser,
};