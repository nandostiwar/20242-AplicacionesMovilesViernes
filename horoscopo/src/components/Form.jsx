import "./styles/Form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form({ callback }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserPerfil, setNewUserPerfil] = useState("user");
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const goTo = useNavigate();

  const validateUser = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/v1/signos/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.resultado === "user") {
          callback("user");
          goTo("/userHome");
        } else if (responseData.resultado === "admin") {
          callback("admin");
          goTo("/adminHome");
        } else {
          alert(
            "Credenciales incorrectas. Por favor, verifica tu nombre de usuario y contraseña."
          );
        }
      })
      .catch(() => {
        alert("Error al conectar con el servidor.");
      });
  };

  const changePassword = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/v1/signos/newpass`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUsername,
        currentPassword,
        newPassword,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message === "Password ha sido modificado") {
          alert("Contraseña cambiada con éxito");
          setIsChangingPassword(false);
        } else {
          alert("Error al cambiar la contraseña: " + response.message);
        }
      });
  };

  const createNewUser = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/v1/signos/newuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUsername,
        password: newUserPassword,
        perfil: newUserPerfil,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message === "Usuario creado exitosamente") {
          alert("Usuario creado exitosamente");
          setIsCreatingUser(false);
        } else {
          alert("Error al crear usuario: " + response.message);
        }
      });
  };

  return (
    <form onSubmit={validateUser}>
      <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
      <h4 className="txt">Nombre de Usuario</h4>
      <input
        type="text"
        className="entry"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <h4 className="txt">Contraseña</h4>
      <input
        type="password"
        className="entry"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input type="submit" value="Ingresar" id="btnEnviar" />
      <br />
      <br />

      <button
        type="button"
        className="button"
        onClick={() => setIsChangingPassword(true)}
      >
        Cambiar Contraseña
      </button>

      {isChangingPassword && (
        <div>
          <h4 className="txt">Nombre de Usuario</h4>
          <input
            type="text"
            className="entry"
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <br />
          <h4 className="txt">Contraseña Actual</h4>
          <input
            type="password"
            className="entry"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <br />
          <h4 className="txt">Nueva Contraseña</h4>
          <input
            type="password"
            className="entry"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <br />
          <br />
          <button onClick={changePassword}>Guardar Nueva Contraseña</button>
        </div>
      )}

      <br />
      <br />

      <button
        type="button"
        className="button"
        onClick={() => setIsCreatingUser(true)}
      >
        Crear Nuevo Usuario
      </button>

      {isCreatingUser && (
        <div>
          <h4 className="txt">Nuevo Nombre de Usuario</h4>
          <input
            type="text"
            className="entry"
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <br />
          <h4 className="txt">Nueva Contraseña</h4>
          <input
            type="password"
            className="entry"
            onChange={(e) => setNewUserPassword(e.target.value)}
          />
          <br />
          <h4 className="txt">Perfil</h4>
          <select
            className="entry"
            onChange={(e) => setNewUserPerfil(e.target.value)}
          >
            <option value="user">USER</option>
            <option value="admin">ADMIN</option>
          </select>
          <br />
          <button onClick={createNewUser}>Crear Usuario</button>
        </div>
      )}
    </form>
  );
}

export default Form;
