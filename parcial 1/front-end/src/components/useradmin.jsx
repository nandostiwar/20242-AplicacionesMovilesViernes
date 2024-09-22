import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import './styles/useradminstilos.css';

function Useradmin({ user }) {
    const navigate = useNavigate();

    const [username, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRol] = useState('');

    if (user !== 'admin' || !user) {
        return <Navigate to="/" />;
    }

    const goHome = () => {
        navigate("/");
    };

    const enviarUsuario = () => {
        if (!username.trim() || !password.trim() || !role.trim()) {
            alert('Por favor, complete todos los campos para crear usuario.');
            return;
        }

        fetch('http://localhost:5000/usuarios/crearUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, role })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || 'Usuario creado con éxito');
            setUsuario('');
            setPassword('');
            setRol('');
        })
        .catch(error => {
            console.error('Error al guardar el Usuario:', error);
        });
    };

    return (
        <div className="container">
            <button className="btn-home" onClick={goHome}>Salir</button>
            <h1>Administrador</h1>
            <h5>Crear Usuarios</h5>

            <h2>Usuarios</h2>
            <div className="form-group">
                <div className="form-field">
                    <label htmlFor="usuario">Usuario</label>
                    <input id='usuario' type="text" placeholder="Nombre de Usuario" value={username} onChange={(e) => setUsuario(e.target.value)} />
                </div>
                <div className="form-field">
                    <label htmlFor="contra">Contraseña</label>
                    <input id='contra' type="password" placeholder="Contraseña Segura" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-field">
                    <label htmlFor="select_rol">Rol</label>
                    <select value={role} onChange={(e) => setRol(e.target.value)} id='select_rol' name="role">
                        <option value="" disabled>Seleccione un rol</option>
                        <option value="admin">Administrador</option>
                        <option value="cliente">Cliente</option>
                    </select>
                </div>
            </div>
            <button className="btn-submit" onClick={enviarUsuario}>Guardar Usuario</button>
        </div>
    );
}

export default Useradmin;
