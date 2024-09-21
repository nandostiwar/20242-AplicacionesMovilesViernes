import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const goTo = useNavigate();
 
    const validateUser = (event)=>{
        event.preventDefault();
        if(username === 'U' && password === 'p'){
            callback("user");
            goTo("/userHome");
        }else if(username === 'admin' && password==='admin2023'){
            callback("admin");
            goTo("/adminHome");
        }
    }
    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)}/><br></br>
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" onChange={(e)=> setPassword(e.target.value)}/><br></br>
        
           
            <div>
            <input type="submit" value="Ingresar" id="btnEnviar"/>  
            </div>

            <input type="submit" value="Registrarse" id="constbuttonStyle"/>

            <br/>
            <input type="submit" value="Olvide mi contraseña" id="constbuttonStyle"/>

        </form>
    )   
}

export default Form;