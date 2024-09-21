import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [role, setRole] = useState('user');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isAddUserOpen, setAddUserOpen] = useState(false);
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
                }
            });
    };

    const changePassword = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/v1/signos/changePassword`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, oldPassword, newPassword })
        })
            .then(res => res.json())
            .then(responseData => {
                alert(responseData.message);
                setModalOpen(false);
            });
    };

    const addUser = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/v1/signos/addUser`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, role })
        })
            .then(res => res.json())
            .then(responseData => {
                alert(responseData.message);
                setAddUserOpen(false);
            });
    };

    return (
        <>
            <form onSubmit={validateUser}>
                <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
                <h4 className="txt">Nombre de Usuario</h4>
                <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} /><br />
                <h4 className="txt">Contraseña</h4>
                <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} /><br />
                <input type="submit" value="Ingresar" id="btnEnviar" />
            </form>
            <button onClick={() => setModalOpen(true)} id="btnCC">C.C</button>
            <button onClick={() => setAddUserOpen(true)} id="btnAddUser">Agregar</button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
                        <h4>Cambio de Contraseña</h4>
                        <input type="text" placeholder="Nombre de Usuario" onChange={(e) => setUsername(e.target.value)} /><br />
                        <input type="password" placeholder="Contraseña Antigua" onChange={(e) => setOldPassword(e.target.value)} /><br />
                        <input type="password" placeholder="Nueva Contraseña" onChange={(e) => setNewPassword(e.target.value)} /><br />
                        <button onClick={changePassword}>Cambiar Contraseña</button>
                    </div>
                </div>
            )}

            {isAddUserOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setAddUserOpen(false)}>&times;</span>
                        <h4>Agregar Nuevo Usuario/Admin</h4>
                        <select onChange={(e) => setRole(e.target.value)} value={role}>
                            <option value="user">Usuario</option>
                            <option value="admin">Admin</option>
                        </select><br />
                        <input type="text" placeholder="Nombre de Usuario" onChange={(e) => setUsername(e.target.value)} /><br />
                        <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} /><br />
                        <button onClick={addUser}>Agregar</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Form;
