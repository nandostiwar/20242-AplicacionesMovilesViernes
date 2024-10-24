import { useState } from "react";
import './styles/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre: username, contrasena:password }),
    });

    const data = await response.json();

    if (data.success) {
        navigate('/admin');
    } else {
      setErrorMessage('Credenciales incorrectas');
    }

    console.log(data);
  };

  const handleChangePassword = () => {
    navigate('/cambiar-contrasena'); 
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div>
          <button type="submit">Login</button>
        </div>
        <button onClick={handleChangePassword}>Cambiar Contraseña</button>
      </form>
    </div>
  );
};

export default Login;
