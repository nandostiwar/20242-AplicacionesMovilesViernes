import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import userData from './../../../Back-end/db/usuarios.json';
import './styles/formstilos.css';

function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const goTo = useNavigate();

    const validateUser = (event) => {
        event.preventDefault();
        const user = userData.find(u => u.username === username && u.password === password);

        if (user) {
            callback(user.role);
            goTo(`/user${user.role}`);
            localStorage.setItem('username', username);
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    const handlePasswordChange = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/usuarios/cambiarPassword', {
                username,
                nuevaPassword: newPassword
            });
            alert(response.data.message);
            setIsChangingPassword(false);
        } catch (error) {
            alert('Error al cambiar la contraseña');
        }
    };

    return (
        <form onSubmit={validateUser} className="form-container">
            <h1 id="txtBienvenida">Inicia sesión para poder navegar</h1>
            <label className="txt">Nombre de Usuario</label>
            <input type="text" className="entry" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
            <label className="txt">Contraseña</label>
            <input type="password" className="entry" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <input type="submit" value="Ingresar" id="botonenviar" className="btn-submit" />
            
            {!isChangingPassword ? (
                <button type="button" className="btn-link" onClick={() => setIsChangingPassword(true)}>¿Olvidaste tu contraseña?</button>
            ) : (
                <div className="change-password">
                    <h3>Cambiar Contraseña</h3>
                    <input 
                        type="password" 
                        placeholder="Nueva Contraseña" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        className="entry"
                    />
                    <button onClick={handlePasswordChange} className="btn-submit">Cambiar Contraseña</button>
                    <button type="button" className="btn-cancel" onClick={() => setIsChangingPassword(false)}>Cancelar</button>
                </div>
            )}
        </form>
    );
}

export default Form;
