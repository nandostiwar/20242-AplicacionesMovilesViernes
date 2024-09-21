import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [resultado, setResultado] = useState('');
    const [texto11, settexso11] = useState('');
    const Navigate = useNavigate();


    const Registra =()=>{
        Navigate ('/registro');
    }
    const  restablecerPassword=()=>{
        Navigate ('/retablecer');
    }
    
    const validateUser = (event)=>{
        event.preventDefault();

        fetch('http://localhost:4000/v1/signos/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'},
              body: JSON.stringify({username,password}) 
            
        })
            .then(res =>res.json())
            .then(responseData => {
              setResultado(responseData);
              console.log(resultado);
            });
          
        
    
            if(resultado === 'user' ){
                callback("user");
              
                Navigate("/userHome");
            }else if(resultado === 'admin' ){
                callback("admin");
                Navigate('/adminHome')
               
        
        
            }

            if(resultado === "Credenciales incorrectas"){

                settexso11(resultado);
            }

    }   


    
    return (
        <form id ="form1 "onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)}/><br></br>
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" onChange={(e)=> setPassword(e.target.value)}/><br></br>
            <h6 id = "texto">{texto11}</h6>
            <input type="submit" value="Ingresar" id="btnEnviar"/>
            <button onClick={Registra}>Registrate</button>
            <a id = "texto" href="#" onClick={restablecerPassword}>Restablecer Contraseña</a>
        </form>
        

        
    )
}

export default Form;