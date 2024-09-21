import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const goTo = useNavigate();
 
    const validateUser = (event)=>{
        event.preventDefault();
        fetch(`http://localhost:4000/v1/signos/login`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        })
            .then(res =>res.json())
            .then(responseData => {
                if(responseData.resultado === 'user'){
                    callback("user");
                    goTo("/userHome");
                }else if(responseData.resultado === 'admin'){
                    callback("admin");
                    goTo("/adminHome");
                }
            })
        
    }
    const cambioPass= () => {
        goTo('/cambioPass');  
    };
    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">ZODIACO</h1>
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