import { useState } from "react";
import '../components/styles/cambiarcontrasena.css'

const CambiarContrasena = () => {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [nombre, setnombre] = useState("");
  const [contrasena, setcontrasena] = useState("");
  const [cedula, setcedula] = useState("");
  const [celular, setcelular] = useState("");
  const [ciudad, setciudad] = useState("");
  const [correo, setcorreo] = useState("");
  const [fechaDeNacimiento, setfechaDeNacimiento] = useState("");
  



  const [message, setMessage] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/auth/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, contrasena, cedula, celular, ciudad, correo }),
    });

    const data = await response.json();

    if (data.success) setMessage("Contraseña cambiada exitosamente");
    else setMessage(data.message);
  };

  return (
    <div className="container">
      <h2>Registrar</h2>

      <form className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <input id="nombre" type="text" value={nombre} onChange={(e) => setnombre(e.target.value)} required/>
      </div>

      <div className="space-y-2">
        <input id="contrasena" type="text" value={contrasena} onChange={(e) => setcontrasena(e.target.value)} required/>
      </div>

      <div className="space-y-2">
        <input id="cedula" type="text" value={cedula} onChange={(e) => setcedula(e.target.value)} required/>
      </div>

      <div className="space-y-2">
        <input id="celular" type="text" value={celular} onChange={(e) => setcelular(e.target.value)} required/>
      </div>

      <div className="space-y-2">
        <input id="ciudad" type="text" value={ciudad} onChange={(e) => setciudad(e.target.value)} required/>
      </div>

      <div className="space-y-2">
        <input id="correo" type="text" value={correo} onChange={(e) => setcorreo(e.target.value)} required/>
      </div>

      <div className="space-y-2">
        <input id="fechaNacimiento" type="text"  />
      </div>
        <button onClick={handleCreate}>Registro</button>
    </form>
    
      {message && <p>{message}</p>}
    </div>
  );
};

export default CambiarContrasena;
