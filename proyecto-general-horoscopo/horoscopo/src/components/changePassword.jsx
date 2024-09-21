// ./components/ChangePassword.jsx
import './styles/Form.css'; // Reutiliza los estilos existentes
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChangePassword({ userType }) {
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async (event) => {
        event.preventDefault();

        // Validar si los campos están vacíos
        if (!username || !currentPassword || !newPassword) {
            setErrorMessage('Por favor, complete todos los campos.');
            setSuccessMessage('');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/v1/signos/updateData', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, currentPassword, newPassword, userType })
            });

            const data = await response.json();

            if (data.success) {
                setSuccessMessage(data.message);
                setErrorMessage('');
                // Opcional: redirigir después de un tiempo
                setTimeout(() => {
                    navigate(`/${userType}Home`);
                }, 2000);
            } else {
                setErrorMessage(data.message || 'Error al cambiar la contraseña.');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setErrorMessage('Error al conectar con el servidor.');
            setSuccessMessage('');
        }
    };

    return (
        <form onSubmit={handleChangePassword} className="form-container">
            <h1 id="txtBienvenida">Cambiar Contraseña</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="form-group">
                <h4 className="txt">Nombre de Usuario</h4>
                <input
                    type="text"
                    className="entry"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /><br />
            </div>
            <div className="form-group">
                <h4 className="txt">Contraseña Actual</h4>
                <input
                    type="password"
                    className="entry"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                /><br />
            </div>
            <div className="form-group">
                <h4 className="txt">Nueva Contraseña</h4>
                <input
                    type="password"
                    className="entry"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                /><br />
            </div>
            <input type="submit" value="Cambiar Contraseña" id="btnEnviar" />
        </form>
    );
}

export default ChangePassword;
