const fs = require("fs").promises;
const path = require("path");

//? FUNCION PARA CREAR UN NUEVO USUARIO
exports.createNewUser = async (req, res) => {
  const { username, password, perfil } = req.body;

  // Verifica que todos los campos sean digitados
  if (!username || !password || !perfil) {
    return res.status(400).json({
      message: "Error, todos los campos son requeridos",
    });
  }

  // Define la ruta del archivo donde se guardará el usuario según el perfil proporcionado
  const rutaAlmacenamiento =
    perfil === "admin"
      ? path.join(__dirname, "../db/adminCredenciales.json")
      : path.join(__dirname, "../db/userCredenciales.json");

  try {
    const allUsers = await fs.readFile(rutaAlmacenamiento, "utf-8");
    const objUsers = JSON.parse(allUsers || "[]"); 

    const userExists = objUsers.some((user) => user.username === username);
    if (userExists) {
      return res.status(400).json({
        message: "El usuario ya existe",
      });
    }

    const newUser = {
      userId: username,
      userPass: password,
      perfil: perfil,
    };
    objUsers.push(newUser);

    await fs.writeFile(rutaAlmacenamiento, JSON.stringify(objUsers, null, 2), {
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

//? Función para actualizar la contraseña del usuario o administrador
const updateUserPassword = async (
  userId,
  currentPassword,
  newPassword,
  profile
) => {
  // Verifica el perfil del usuario para saber en qué archivo JSON debe buscar admin o user
  const direccionDeArchivo =
    profile === "admin"
      ? path.join(__dirname, "../db/adminCredenciales.json")
      : path.join(__dirname, "../db/userCredenciales.json");

  const data = await fs.readFile(direccionDeArchivo, "utf-8");
  const users = JSON.parse(data);

  // Buscar el usuario 
  const userIndex = users.findIndex((user) => user.userId === userId);

  if (userIndex !== -1) {
    // Compara la contraseña actual
    if (currentPassword !== users[userIndex].userPass) {
      throw new Error("La contraseña actual es incorrecta.");
    }

    // Actualiza la contraseña con la nueva 
    users[userIndex].userPass = newPassword;

    // Escribe el archivo actualizado
    await fs.writeFile(direccionDeArchivo, JSON.stringify(users, null, 2));
    return "La contraseña ha sido modificada";
  }

  return null;
};

// Función para actualizar la contraseña del usuario

exports.updatePassword = async (req, res) => {
  const { userId, currentPassword, newPassword, perfil } = req.body;

  try {
    // Actualizar la contraseña según el perfil
    const message = await updateUserPassword(
      userId,
      currentPassword,
      newPassword,
      perfil
    );

    if (message) {
      return res.json({ message });
    }

    return res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    console.error("Error al modificar la contraseña:", error);
    return res.status(500).json({ message: error.message });
  }
};


//?Funcion para iniciar sesion
exports.validarLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Leer credenciales de ambos archivos
    const adminPath = path.resolve(__dirname, "../db/adminCredenciales.json");
    const userPath = path.resolve(__dirname, "../db/userCredenciales.json");

    const [adminData, userData] = await Promise.all([
      fs.readFile(adminPath, "utf-8"),
      fs.readFile(userPath, "utf-8"),
    ]);

    const adminCredentials = JSON.parse(adminData);
    const userCredentials = JSON.parse(userData);

    // Buscar en las credenciales si hay una coincidencia
    const adminUser = adminCredentials.find(
      (c) => c.userId.trim() === username.trim() && c.userPass === password
    );

    if (adminUser) {
      return res.json({ resultado: "admin" });
    }

    const userUser = userCredentials.find(
      (c) => c.userId.trim() === username.trim() && c.userPass === password
    );

    if (userUser) {
      return res.json({ resultado: "user" });
    }

    // Si no hay coincidencias
    return res.status(401).json({ resultado: "Credenciales incorrectas" });
  } catch (error) {
    console.error("Error al verificar el login:", error);
    return res.status(500).json({ resultado: "Error en el servidor" });
  }
};