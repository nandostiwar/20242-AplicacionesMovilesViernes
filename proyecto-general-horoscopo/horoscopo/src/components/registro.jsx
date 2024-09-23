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
    <form onSubmit={handleRegister}>
      <h1 id="txtBienvenida">Registro de Usuario</h1>
      <h4 className="txt">Nombre de Usuario</h4>
      <input
        type="text"
        className="entry"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <h4 className="txt">Contraseña</h4>
      <input
        type="password"
        className="entry"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <h4 className="txt">Tipo de Usuario</h4>
      <select
        className="entry"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
      >
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <input type="submit" value="Registrar" id="btnEnviar" />
    </form>
  );
};

export default Registro;
