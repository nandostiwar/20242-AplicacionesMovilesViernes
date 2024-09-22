import { useState } from "react";
import "./loginForm.css"

//Recibe 2 props 
//callback: Se espera que sea una función que maneje la lógica relacionada con el tipo de usuario (puede ser un usuario regular o un administrador).
//goTo: Se espera que sea una función para cambiar de ruta (navegación) en la aplicación.
function LoginForm({ callback, goTo }) {
  // Almacena los datos del usuario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateUser = (event) => {
    event.preventDefault();
    // Limpiar mensaje de error anterior
    setErrorMessage("");

    fetch(`http://localhost:4000/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }), // Convierte el objeto a JSON
    })
      .then((res) => {
        if (!res.ok) {
          // Si la respuesta no es "ok", se lanza un error
          throw new Error("Error de autenticación");
        }
        return res.json(); // Convertir la respuesta en JSON
      })
      .then((responseData) => {
        if (responseData.resultado === "user") {
          callback("user");
          goTo("/userHome");
        } else if (responseData.resultado === "admin") {
          callback("admin");
          goTo("/adminHome");
        } else {
          setErrorMessage("Credenciales incorrectas.");
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Error al conectar con el servidor.");
      });
  };

  return (
    <form onSubmit={validateUser}>
      <h4 className="txt">Nombre de Usuario</h4>
      <input
        type="text"
        className="entry"
        value={username} // Muestra el valor actual del input
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br />
      <h4 className="txt">Contraseña</h4>
      <input
        type="password"
        className="entry"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <input type="submit" value="Ingresar" id="btnEnviar" />
      <br />
      <br />
      {/* Mensaje de error */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
}

export default LoginForm;
