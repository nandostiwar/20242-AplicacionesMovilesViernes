import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePasswords() {
    const [username, setUsername] = useState("");  // Inicializado como string vacía
    const [password, setPassword] = useState("");  // Inicializado como string vacía
    const [update, setUpdate] = useState("");      // Inicializado como string vacía

    const goTo = useNavigate();

    const crearuser = (event) => {
        event.preventDefault();

        // Asegurarse de que los campos no estén vacíos
        if (!username || !password) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Realizar la solicitud PATCH
        fetch(`http://localhost:4000/v1/signos/crear`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password})  // Enviar datos a la API
        })
            .then(res => res.json())
            .then(responseData => {
                if (responseData.resultado === 'Contraseña actualizada correctamente') {
                    alert("Contraseña actualizada correctamente");
                    goTo("/Form");  // Redirigir a la página de inicio de sesión
                } else if (responseData.resultado === 'Credenciales inválidas') {
                    alert("Credenciales inválidas");
                }
            })
            .catch(error => {
                console.error("Error en la actualización de contraseña:", error);
                alert("Hubo un error en la solicitud. Inténtalo de nuevo.");
            });
    }

    return (
        <form onSubmit={crearuser}>
            <h1 id="txtBienvenida">Crear usuarios</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" value={username} onChange={(e) => setUsername(e.target.value)} /><br />

            <h4 className="txt">crear contrasena</h4>  
            <input type="password" className="entry" value={password} onChange={(e) => setPassword(e.target.value)} /><br />

            <input type="submit" value="crear" id="btnEnviar" />

        </form> 
    );
}

export default ChangePasswords;
