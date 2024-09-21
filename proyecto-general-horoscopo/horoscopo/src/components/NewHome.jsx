import './styles/NewHome.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewHome ({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('user');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const goTo = useNavigate();

    const New = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/v1/signos/update`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.resultado === 'user') {
                callback("user");
                goTo("/userHome");
            } else if (data.resultado === 'admin') {
                callback("admin");
                goTo("/adminHome");
                console.log('Login exitoso');
            } else {
                setErrorMessage('Credenciales incorrectas');
            }
        } catch (error) {
            setErrorMessage('Error al conectar con el servidor.');
            console.error("Error en la solicitud:", error);
        }
    };

    const goHome = (event) => {
        event.preventDefault();
        goTo("/"); 
    };

    const updateUserData = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            setErrorMessage('Por favor, complete todos los campos para actualizar.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/v1/signos/update`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, userType })
            });

            const data = await response.json();

            if (data.success) {
                setSuccessMessage(`Datos de ${userType} actualizados correctamente`);
                setErrorMessage('');
            } else {
                setErrorMessage('Error al actualizar los datos');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Error al conectar con el servidor.');
            setSuccessMessage('');
            console.error("Error en la solicitud de actualización:", error);
        }
    };

    return (
        <form>
            <h1 id="txtBienvenida">Bienvenido al Registro de Nuevos Usuarios</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
            <h4 className="txt">Tipo de Usuario</h4>
            <select
                className="entry"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
            >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
            </select><br />
            <button onClick={updateUserData} id="btnUpdate">Registrar</button>
            <button onClick={goHome} id="btnUpdate">Home</button>
        </form>
    );
}

export default NewHome;