import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [rol, setRol] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showChange, setShowChange] = useState(false);

    const goTo = useNavigate();

    const validateUser = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/v1/signos/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(responseData => {
                if (responseData.resultado === 'user') {
                    callback("user");
                    goTo("/userHome");
                } else if (responseData.resultado === 'admin') {
                    callback("admin");
                    goTo("/adminHome");
                } else {
                    alert("Usuario o contraseña incorrectos");
                }
            })

    }

    const onHandleCrear = async (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/v1/signos/crearUsuario`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, rol })
        })
            .then(res => res.json())
            .then(responseData => {
                if (responseData.resultado === 'creado') {
                    alert("Usuario creado exitosamente");
                } else if (responseData.resultado === 'ausencia') {
                    alert("Faltan datos");
                } else {
                    alert("Usuario ya existe");
                }
            })
    }

    const onHandleCambiarClave = async (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/v1/signos/cambiarClave`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, newPassword })
        })
            .then(res => res.json())
            .then(responseData => {
                if (responseData.resultado === 'cambiado') {
                    alert("Clave cambiada exitosamente");
                } else if (responseData.resultado === 'ausencia') {
                    alert("Faltan datos");
                } else {
                    alert("Usuario o clave incorrectos");
                }
            })
    }

    return (
        <form onSubmit={validateUser}>
            {!showForm && !showChange && (
                <div>
                    <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
                    <h4 className="txt">Nombre de Usuario</h4>
                    <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} required /><br></br>
                    <h4 className="txt">Contraseña</h4>
                    <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} required /><br></br>
                    <input type="submit" value="Ingresar" className="boton" />
                </div>
            )}

            {showForm && !showChange && (
                <div>
                    <h1 id="txtBienvenida">Crear Usuario</h1>
                    <h4 className="txt">Nombre de Usuario</h4>
                    <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} required /><br></br>
                    <h4 className="txt">Contraseña</h4>
                    <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} required /><br></br>
                    <h4 className="txt">Rol</h4>
                    <select className="entry" onChange={(ev) => setRol(ev.target.value)} required>
                        <option value="user"> user </option>
                        <option value="admin"> admin </option>
                    </select> <br></br>
                    <input type="button" value="Crear Usuario" className="boton" onClick={(ev) => onHandleCrear(ev)} />
                </div>
            )}
            {showChange && (
                <div>
                    <h1 id="txtBienvenida">Cambiar Clave</h1>
                    <h4 className="txt">Nombre de Usuario</h4>
                    <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} required /><br></br>
                    <h4 className="txt">Contraseña Actual</h4>
                    <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} required /><br></br>
                    <h4 className="txt">Contraseña Nueva</h4>
                    <input type="password" className="entry" onChange={(e) => setNewPassword(e.target.value)} required /><br></br>
                    <input type="button" value="Cambiar Clave" className="boton" onClick={(ev) => onHandleCambiarClave(ev)} />
                </div>
            )}
            <input type='button' className="boton" onClick={() => { setShowForm(!showForm); setShowChange(false) }} value={!showForm ? 'Crear Usuario' : 'Regresar'} />
            <input type="button" className="boton" onClick={() => { setShowChange(!showChange); setShowForm(false) }} value={!showChange ? 'Cambiar Clave' : 'Regresar'} />

        </form>
    )
}

export default Form;