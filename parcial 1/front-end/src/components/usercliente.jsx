import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import './styles/usercliente.css';

function Usercliente({ user }) {
    const navigate = useNavigate();

    if (user !== 'cliente' || !user) {
        return <Navigate to="/" />;
    }

    const goHome = () => {
        navigate("/");
    };

    const [username, setUsername] = useState('Juan Pérez');
    const [email, setEmail] = useState('juan.perez@example.com');

    return (
        <div className="container">
            <div className="navbar">
                <button className="btn-home" onClick={goHome}>Salir</button>
                <h1>Cliente</h1>
                <nav>
                    <button>Perfil</button>
                    <button>Actualizar Información</button>
                </nav>
            </div>
            <div className="profile-card">
                <h2>Perfil de Usuario</h2>
                <p><strong>Nombre:</strong> {username}</p>
                <p><strong>Email:</strong> {email}</p>
            </div>
            <div className="update-info-card">
                <h2>Actualizar Información</h2>
                <label htmlFor="username">Nombre:</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={() => alert('Información actualizada')}>Guardar Cambios</button>
            </div>
        </div>
    );
}

export default Usercliente;
