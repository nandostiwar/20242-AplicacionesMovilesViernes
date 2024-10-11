import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const goTo = useNavigate();
 
    const validateUser = (event) => {
        event.preventDefault();
        
        if (!username || !password) {
            alert('Por favor, ingresa un usuario y una contraseña');
            return;
        }
    
        fetch('http://localhost:4000/v1/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(responseData => {
            if (responseData.resultado === 'user') {
                callback('user');
                goTo('/userHome');
            } else if (responseData.resultado === 'admin') {
                callback('admin');
                goTo('/adminHome');
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema con el servidor.');
        });
    };
    
    const cambioPass= () => {
        goTo('/cambioPass');  
    };
    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">PORTAL DEL ZODIACO</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)}/><br></br>
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" onChange={(e)=> setPassword(e.target.value)}/><br></br>
            <input type="submit" value="Ingresar" id="btnEnviar"/>
            <input type="button" onClick={cambioPass} id="btnEnviar" value="Cambiar Contraseña"/>
            
        </form>
    )
}

export default Form;