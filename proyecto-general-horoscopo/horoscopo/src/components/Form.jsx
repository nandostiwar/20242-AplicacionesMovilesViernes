import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const goTo = useNavigate();

    // Validar usuario
    const validateUser = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/v1/signos/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => res.json())
            .then((responseData) => {
                if (responseData.resultado === 'user') {
                    callback("user");
                    goTo("/userHome");
                } else if (responseData.resultado === 'admin') {
                    callback("admin");
                    goTo("/adminHome");
                } else {
                    setErrorMessage('Usuario o contraseña incorrectos');
                }
            })
            .catch((error) => {
                console.error("Error en la validación:", error);
                setErrorMessage('Error del servidor, intenta nuevamente');
            });
    };

    // Redirigir a la página de actualización de contraseña
    const updateData = () => {
        goTo("/changePassword");
    };

    // Redirigir a la página de registro de usuario
    const registerUser = () => {
        goTo("/registro");
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            
            {/* Mostrar mensaje de error si lo hay */}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <h4 className="txt">Nombre de Usuario</h4>
            <input
                type="text"
                className="entry"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            /><br />

            <h4 className="txt">Contraseña</h4>
            <input
                type="password"
                className="entry"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />

            {/* Botón de Ingresar */}
            <input type="submit" value="Ingresar" id="btnEnviar" />

            {/* Botón para Cambiar Contraseña */}
            <button type="button" onClick={updateData} id="btnUpdate">Cambiar Contraseña</button>

            {/* Botón para Registrarse */}
            <button type="button" onClick={registerUser} id="btnRegistro">Registrarse</button>
        </form>
    );
}

export default Form;
