// src/components/Registro.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Form.css'; // Usamos el mismo estilo que ya tienes

const Registro = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // Valor por defecto: usuario
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('Faltan datos por completar.');
      return;
    }

    const data = {
      username,
      password,
      userType,
    };

    try {
      const response = await fetch('http://localhost:4000/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Registro exitoso');
        navigate('/login'); // Redirigir al login después de registrar
      } else {
        setErrorMessage(result.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setErrorMessage('Error del servidor al registrar.');
    }
  };

  return (
    <div className="form-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegister} className="form">
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userType">Tipo de usuario:</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Registro;
