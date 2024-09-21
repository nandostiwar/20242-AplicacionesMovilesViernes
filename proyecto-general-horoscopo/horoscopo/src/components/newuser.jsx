import { useState } from "react";

function NewUser() {
  const [newUsername, setNewUsername] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserPerfil, setNewUserPerfil] = useState("user");

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
        } else {
          alert("Error al crear usuario: " + response.message);
        }
      });
  };

  return (
    <form onSubmit={createNewUser}>
      <h4 className="txt">Nuevo Nombre de Usuario</h4>
      <input type="text" className="entry" onChange={(e) => setNewUsername(e.target.value)} />
      <br />
      <h4 className="txt">Nueva Contraseña</h4>
      <input type="password" className="entry" onChange={(e) => setNewUserPassword(e.target.value)} />
      <br />
      <h4 className="txt">Perfil</h4>
      <select className="entry" onChange={(e) => setNewUserPerfil(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <br />
      <button type="submit">Crear Usuario</button>
    </form>
  );
}

export default NewUser;
