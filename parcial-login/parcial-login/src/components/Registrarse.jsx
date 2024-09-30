import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registrarse({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('user'); // Rol predeterminado
    const goTo = useNavigate();

    const handleSelect = (event) => {
        setRol(event.target.value); // Actualizar el rol cuando se selecciona
    };
    
    const registerUser = (event) => {
        event.preventDefault();
        let url = 'http://localhost:4000/v1/api/nuevaCuenta';

        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: username, pass: password , rol: rol }) 
        })
            .then(res => res.json())
            .then(responseData => {
                if (responseData.exists) {
                    alert('El usuario ya existe');
                } else if (responseData.success) {
                    alert('Usuario registrado exitosamente');
                    callback(rol);  // Llamar callback con el rol
                    if (rol === 'user') {
                        goTo("/userHome");
                    } else if (rol === 'admin') {
                        goTo("/adminHome");
                    }
                } else {
                    alert('Error al registrar el usuario');
                }
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Error en el registro');
            });
    };
    const handleGoBack = () => {
        goTo('/'); 
    };

    return (
        <form onSubmit={registerUser}>
            <h1 id="txtBienvenida">Registro</h1>
            <h4 className="txt">Rol</h4>
            <select id="rol" value={rol} onChange={handleSelect}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select><br />
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
            <input type="submit" value="Registrar" id="btnEnviar" />
            <input type="button" onClick={handleGoBack} id="btnEnviar" value="Volver" />
        </form>
    );
}

export default Registrarse;
