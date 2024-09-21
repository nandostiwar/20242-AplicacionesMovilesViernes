import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Impide el envio del formulario con los campos vacios
    const goTo = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();

        // Validar si los campos están vacíos
        if (!username || !password) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;  // No continúa si los campos están vacíos
        }

        // Si los campos están llenos, realizar la solicitud
        try {
            const response = await fetch(`http://localhost:4000/v1/signos/login`, {
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
    
    // Redirige a la página de actualización de datos
    const DataHome = (event) => {
        event.preventDefault();
        goTo("/DataHome"); 
    };

    const NewHome = (event) => {
        event.preventDefault();
        goTo("/NewHome"); 
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
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
            <input type="submit" value="Ingresar" id="btnEnviar" />
            <input type="submit" value="Actualziar contraseña" id="btnUpdate" onClick={DataHome}/>
            <input type="submit" value="Registrar Usuario" id="btnNew" onClick={NewHome}/>

            </form>
    );
}

export default Form;