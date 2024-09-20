import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [update, setupdate] = useState(null);

    const goTo = useNavigate();
 
    const updatepassword = (event)=>{
        event.preventDefault();
        fetch('http://localhost:4000/v1/signos/actualizar', {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password, update})
        })
            .then(res =>res.json())
            .then(responseData=>{
                if(responseData.resultado=== 'Contraseña actualizada correctamente'){
                    callback("Contraseña actualizada correctamente");
                    goTo("/Form");
                }else if(responseData.resultado=== 'Credenciales inválidas'){
                    callback("Credenciales inválidas");
                    goTo("/Form");
                }

            })
        
    }
    return (
        <form onSubmit={updatepassword}>
            <h1 id="txtBienvenida">cambiar contrasena</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)}/><br></br>
            <h4 className="txt">Contraseña actual</h4>  
            <input type="password" className="entry" onChange={(e)=> setPassword(e.target.value)}/><br></br>
            <h4 className="txt">Contraseña nueva</h4>  
            <input type="password" className="entry" onChange={(e)=> setupdate(e.target.value)}/><br></br>
            <input type="submit" value="actualizar" id="btnEnviar"/>
            
        </form> 
    );
}

export default ChangePassword;