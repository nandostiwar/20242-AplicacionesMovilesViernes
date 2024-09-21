import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const goTo = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();

        // Validar si los campos están vacíos
        if (!username || !password) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;  
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

    //actualizar User
    const registerUser = async (event) => {
        event.preventDefault();

        // Validar si los campos están vacíos
        if (!username || !password) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;  // No continúa si los campos están vacíos
        }

        // Si los campos están llenos, realizar la solicitud
        try {
            const response = await fetch(`http://localhost:4000/v1/signos/Update`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.resultado === 'success') {
                setErrorMessage('Error al actualizar usuario');
            } else {
                setErrorMessage('Registro exitoso. Ahora puede iniciar sesión.');
            }
        } catch (error) {
            setErrorMessage('Error al conectar con el servidor.');
            console.error("Error en la solicitud:", error);
        }
    };

    
    const NewUser = (event) => {
            event.preventDefault();
            goTo("/Registro"); 
        };



    return (
        <form>
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
            <button onClick={validateUser} id="btnIngresar">Ingresar</button>
            <button onClick={registerUser} id="btnActualizar">Actualizar</button>
            <button type="button" onClick={NewUser} id="btnRegistro">Registro</button>
            
           
            
            


        </form>
    );
}


export default Form;
