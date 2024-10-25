// src/pages/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Mass.css';

const UserProfile = () => {
  const [codigo, setCodigo] = useState('');
  const [codigos, setCodigos] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchCodigos = async () => {
    const usuarioId = localStorage.getItem('userId'); // Suponiendo que el ID del usuario está almacenado
    try {
      const response = await axios.get(`http://localhost:5000/api/premios/${usuarioId}`);
      setCodigos(response.data);
    } catch (error) {
      setError('Error al obtener los códigos');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioId = localStorage.getItem('userId');
    try {
      const response = await axios.post('http://localhost:5000/api/premios/ingresar-codigo', { codigo, usuarioId });
      setMessage(response.data.premio);
      fetchCodigos(); // Refrescar los códigos ingresados
    } catch (error) {
      setError('Código ya ha sido utilizado');
    }
  };

  useEffect(() => {
    fetchCodigos();
  }, []);

  return (
    <div className="user-profile">
      <h2>Perfil de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Ingresa el código" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
        <button type="submit">Enviar Código</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Códigos Ingresados</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Código</th>
            <th>Premio</th>
          </tr>
        </thead>
        <tbody>
          {codigos.map((codigo) => (
            <tr key={codigo._id}>
              <td>{new Date(codigo.fechaIngreso).toLocaleDateString()}</td>
              <td>{codigo.codigo}</td>
              <td>{codigo.premio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;
