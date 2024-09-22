import { useState } from "react";
import "./createUserForm.css";

function CreateUserForm({ setIsCreatingUser }) {
  //Almacena los datos introducidos por el usuario
  const [newUsername, setNewUsername] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserPerfil, setNewUserPerfil] = useState("user");

    
  //Función que se llama cuando se envía el formulario.
  const createNewUser = (event) => {
    event.preventDefault();//evita que la página se recargue al enviar el formulario.
    fetch(`http://localhost:4000/api/createuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //Se envían los datos del nuevo usuario como un objeto JSON en el cuerpo de la solicitud.
      body: JSON.stringify({
        username: newUsername,
        password: newUserPassword,
        perfil: newUserPerfil,
      }),
    })
      //Manejo de la RESPUESTA
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
    <form onSubmit={createNewUser}>
      <h4 className="txt">Nombre de Usuario</h4>
      <input
        type="text"
        className="entry"
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <br />
      <h4 className="txt">Contraseña</h4>
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
      <button type="submit">Crear Usuario</button>
    </form>
  );
}

export default CreateUserForm;
