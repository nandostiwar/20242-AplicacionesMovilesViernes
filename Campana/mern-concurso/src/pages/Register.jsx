// src/pages/Register.jsx
import React, { useState } from 'react';
import '../styles/Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          address,
          phone,
          birthdate,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Usuario registrado:', data);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
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
    <div className="register-container">
      <div className="register">
        <h2>Registro</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type="text"
            placeholder="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <button type="submit">Registrar</button>
        </form>
        <a href="/login">Iniciar Sesión</a>
      </div>
    </div>
  );
};

export default Register;
