// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Inicio de sesión exitoso:', data);
        // Redirige al usuario a la página deseada
        navigate('/dashboard'); // Cambia '/dashboard' por la ruta que quieras
      } else {
        console.error(data.message); // Muestra el mensaje de error
        setError(data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error en la solicitud, intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Clave"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
        <a href="/register">¿No tienes cuenta? Regístrate</a>
      </div>
    </div>
  );
};

export default Login;
