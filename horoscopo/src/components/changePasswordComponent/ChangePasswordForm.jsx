import { useState } from "react";
import "./ChangePasswordForm.css";

function ChangePasswordForm({ setIsChangingPassword }) {
  const [userId, setUserId] = useState(""); 
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [perfil, setNewUserPerfil] = useState("user");

  const changePassword = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/api/actualizarPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,             
        currentPassword,
        newPassword,
        perfil,             
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message === "La contraseña ha sido modificada") {
          alert("Contraseña cambiada con éxito");
          setIsChangingPassword(false);
        } else {
          alert("Error al cambiar la contraseña: " + response.message);
        }
      })
      .catch((error) => {
        console.error("Error en la petición:", error);
        alert("Error en la petición. Intenta de nuevo.");
      });
  };

  return (
    <form onSubmit={changePassword}>
      <h4 className="txt">Nombre de Usuario</h4>
      <input
        type="text"
        className="entry"
        value={userId}
        onChange={(e) => setUserId(e.target.value)} 
      />
      <br />
      <h4 className="txt">Contraseña Actual</h4>
      <input
        type="password"
        className="entry"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <br />
      <h4 className="txt">Nueva Contraseña</h4>
      <input
        type="password"
        className="entry"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <br />
      <select
        className="entry"
        value={perfil} 
        onChange={(e) => setNewUserPerfil(e.target.value)}
      >
        <option value="user">USER</option>
        <option value="admin">ADMIN</option>
      </select>
      <button type="submit">Guardar Nueva Contraseña</button>
    </form>
  );
}

export default ChangePasswordForm;
