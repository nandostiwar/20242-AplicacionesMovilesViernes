import { useState } from "react";
import '../components/styles/cambiarcontrasena.css'

const CambiarContrasena = () => {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/auth/cambiar-contrasena", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, currentPassword, newPassword }),
    });

    const data = await response.json();

    if (data.success) setMessage("Contraseña cambiada exitosamente");
    else setMessage(data.message);
  };

  return (
    <div className="container">
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleChangePassword}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Contraseña Actual" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
        <input type="password" placeholder="Nueva Contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <button type="submit">Cambiar Contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CambiarContrasena;
