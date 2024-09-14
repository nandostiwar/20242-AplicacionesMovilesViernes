import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const goTo = useNavigate();
 

    const validateUser = async (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/v1/signos/login}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        })
            .then(res =>res.json())
            .then(responseData => {
                setResultado(responseData.resultado)
                if(resultado === 'user' ){
                    callback("user");
                    goTo("/userHome");
                }else if (respondeData.resultado === 'admin')
                    callback("admin");
                    goTo("/admin")
                
                // setResultado(responseData)
                // console.log(resultado)
            })
    };
    

    /*
    }
    /* const validateUser = (event)=>{
        event.preventDefault();
        if(username === 'user' && password === 'user2023'){
            callback("user");
            goTo("/userHome");
        }else if(username === 'admin' && password==='admin2023'){
            callback("admin");
            goTo("/adminHome");
        }
    }*/
    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)}/><br></br>
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" onChange={(e)=> setPassword(e.target.value)}/><br></br>
            <input type="submit" value="Ingresar" id="btnEnviar"/>
        </form>
    )
}

export default Form;