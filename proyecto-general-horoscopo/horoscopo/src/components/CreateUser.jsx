import './styles/CreateUser.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleCreateUser = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/v1/signos/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data && data.success) {
                alert('Usuario creado exitosamente');
                navigate('/user-home'); // Redirige a la vista de usuario
            } else {
                alert(data.message || 'Error en la creación de usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la solicitud: ' + error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleCreateUser}>
                <h1 id="tituloCrearUsuario">Crear Usuario</h1>
                <input
                    type="text"
                    id="inputUsername"
                    placeholder="Nombre de Usuario"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    id="inputPassword"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" id="btnCrear">Crear Usuario</button>
                <button type="button" id="btnHome" onClick={() => navigate('/')}>Volver a Inicio</button>
            </form>
        </div>
    );
}

export default CreateUser;
