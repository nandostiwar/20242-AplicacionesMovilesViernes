import { useState } from "react";
import "./styles/updatePassword.css"

function UpdatePassword() {
  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
        } else {
          alert("Error al cambiar la contraseña: " + response.message);
        }
      });
  };

  return (
    <form onSubmit={changePassword}>
      <h4 className="txt">Nombre de Usuario</h4>
      <input type="text" className="entry" onChange={(e) => setNewUsername(e.target.value)} />
      <br />
      <h4 className="txt">Contraseña Actual</h4>
      <input type="password" className="entry" onChange={(e) => setCurrentPassword(e.target.value)} />
      <br />
      <h4 className="txt">Nueva Contraseña</h4>
      <input type="password" className="entry" onChange={(e) => setNewPassword(e.target.value)} />
      <br />
      <button className="button-guardar" type="submit">Guardar Nueva Contraseña</button>
    </form>
  );
}

export default UpdatePassword;
