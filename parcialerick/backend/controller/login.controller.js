const fs = require("fs/promises");
const path = require("path");

const validarUsuario = async (req, res) => {
  try {
    console.log(req.body);

    const { username, password } = req.body;
    const usuariosAdmin = await fs.readFile(path.join(__dirname, "../db/admin.json"));
    const usuariosNormales = await fs.readFile(path.join(__dirname, "../db/usuarios.json"));

    const admin = JSON.parse(usuariosAdmin);
    const usuarios = JSON.parse(usuariosNormales);

    const findUser = (usersArray) => usersArray.find((user) => user.username === username && user.password === password);

    const adminUser = findUser(admin.usuarios);
    const normalUser = findUser(usuarios.usuarios);

    if (adminUser) {
      return res.status(200).json({
        message: "Login exitoso - Admin",
        success: true,
        role: "admin",
        user: adminUser,
      });
    }

    if (normalUser) {
      return res.status(200).json({
        message: "Login exitoso - Usuario Normal",
        success: true,
        role: "user",
        user: normalUser,
      });
    }

    return res.status(401).json({ message: "Credenciales incorrectas", success: false });
  } catch (error) {}
};

const cambiarContrasena = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;
  try {
    const usuariosAdmin = await fs.readFile(path.join(__dirname, "../db/admin.json"), "utf-8");
    const usuariosNormales = await fs.readFile(path.join(__dirname, "../db/usuarios.json"), "utf-8");

    const admins = JSON.parse(usuariosAdmin);
    const usuarios = JSON.parse(usuariosNormales);

    const userInAdmin = admins.usuarios.find((user) => user.username === username && user.password === currentPassword);
    const userInNormal = usuarios.usuarios.find((user) => user.username === username && user.password === currentPassword);

    if (userInAdmin || userInNormal) {
      if (userInAdmin) {
        userInAdmin.password = newPassword;
      } else {
        userInNormal.password = newPassword;
      }

      await fs.writeFile(path.join(__dirname, "../db/admin.json"), JSON.stringify(admins, null, 2));
      await fs.writeFile(path.join(__dirname, "../db/usuarios.json"), JSON.stringify(usuarios, null, 2));

      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

module.exports = {
  validarUsuario,
  cambiarContrasena
};
