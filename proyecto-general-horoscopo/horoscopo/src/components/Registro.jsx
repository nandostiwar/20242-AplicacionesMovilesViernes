import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Valor por defecto 'user'
    const [errorMessage, setErrorMessage] = useState('');
    const goTo = useNavigate();

    const registerUser = async (event) => {
        event.preventDefault();

        // Validar si los campos están vacíos
        if (!username || !password || !role) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;
        }

        // Realizar la solicitud de registro
        try {
            const response = await fetch(`http://localhost:4000/v1/signos/registerUser`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, role })
            });

            const data = await response.json();

            if (data.resultado === 'success') {
                setErrorMessage('Registro exitoso. Ahora puede iniciar sesión.');
                goTo("/login");
            } else {
                setErrorMessage('Error al registrar usuario');
            }
        } catch (error) {
            setErrorMessage('Error al conectar con el servidor.');
            console.error("Error en la solicitud:", error);
        }
    };

    const Home = (event) => {
        event.preventDefault();
        goTo("/"); 
    };

    return (
        <form>
            <h1 id="txtBienvenida">Registro de Usuario</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <h4 className="txt">Nombre de Usuario</h4>
            <input
                type="text"
                className="entry"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            /><br />
            <h4 className="txt">Contraseña</h4>
            <input
                type="password"
                className="entry"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            /><br />
            <h4 className="txt">Rol</h4>
            <select
                className="entry"
                onChange={(e) => setRole(e.target.value)}
                value={role}
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select><br />
            <button id="btnRegistro" onClick={registerUser}>Registrar</button>
            <button id="btnHomeAdmin" onClick={Home}>Home</button>
        </form>
    );
}

export default RegisterForm;
