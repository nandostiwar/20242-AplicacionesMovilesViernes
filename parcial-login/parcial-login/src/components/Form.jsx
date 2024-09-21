import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

    const validateUser = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: username, pass: password }) // Asegúrate de usar los nombres correctos de los campos según tu servidor
        })
            .then(res => res.json())
            .then(responseData => {
                if (responseData.rol === 'user') {
                    callback('user');
                    goTo("/userHome");
                } else if (responseData.rol === 'admin') {
                    callback('admin');
                    goTo("/adminHome");
                } else {
                    alert('Usuario o contraseña incorrectos');
                }
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Error al intentar iniciar sesión');
            });
    };

    const cambioPass = () => {
        goTo('/cambioPass');
    };
    const registrarse = () => {
        goTo('/registrarse');
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">LOGIN</h1>
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
            <input type="submit" value="Ingresar" id="btnEnviar" />
            <input type="button" onClick={cambioPass} id="btnEnviar" value="Cambiar Contraseña" />
            <input type="button" onClick={registrarse} id="btnEnviar" value="Registrarse" />
        </form>
    );
}

export default Form;
