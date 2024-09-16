import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormCambioPass() {
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const actualizarPass = async (event) => {
        event.preventDefault();
        try {
            // Reemplaza la URL con el endpoint de tu servidor para actualizar la contraseña
            const response = await fetch(`http://localhost:4000/v1/signos/cambioPass`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, currentPassword, newPassword })
            });
            const responseData = await response.json();
            if (responseData.success) {
                alert('Contraseña actualizada con éxito');
                navigate('/'); // Redirige a la página de inicio o a la página de login
            } else {
                alert('Error al actualizar la contraseña: ' + responseData.error);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            alert('Error al procesar la solicitud');
        }
    };

    const handleGoBack = () => {
        navigate('/'); 
    };

    return (
        <form onSubmit={actualizarPass}>
            <h1 id="txtBienvenida">Cambiar Contraseña</h1>
            <h4 className="txt">Nombre de Usuario</h4>
            <input type="text" className="entry" value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            /><br />
            <h4 className="txt">Contraseña Actual</h4>
            <input type="password" className="entry" value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
            /><br />
            <h4 className="txt">Nueva Contraseña</h4>
            <input type="password" className="entry" value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            /><br />
            <input type="submit" value="Actualizar" id="btnEnviar" />
            <button type="button" onClick={handleGoBack} id="btnEnviar" value="Volver" />
        </form>
    );
}

export default FormCambioPass;
