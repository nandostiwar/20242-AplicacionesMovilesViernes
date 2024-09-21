import { useState } from "react";
import '../components/styles/styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:4000/login', { username, password });
    const data = await response.json();

    if (data.success) {
      if (data.role === 'admin') navigate('/Administrador');
      else if (data.role === 'user') navigate('/Usuarionoadministrador'); 
    } else setErrorMessage('Credenciales incorrectas');
  };

  const cambiodecontrasena = () => {
    navigate('/cambiodecontrasena'); 
  };

  return (
    <div className="container">
      <h2>Bienvenido</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div>
          <button type="submit">Login</button>
        </div>
        <a onClick={cambiodecontrasena}>Cambio Contraseña</a>
      </form>
    </div>
  );
};

export default Login;
