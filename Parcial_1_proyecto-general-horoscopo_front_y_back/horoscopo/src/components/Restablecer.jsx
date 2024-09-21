import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './styles/Registro.css';

const Restablecer = ()=>{
    
    const home = useNavigate();
    const [rolD , setrolD]= useState("");
    const [respuesta , setRespuesta]= useState("");

    const [newpassword, setnewPassword]= useState({
        
        "usuario":"",
        "password":""
    });

    function goHome(){
        home("/");
    }

    const RegistrarRol = (e) =>{

        const pass = e.target.value;

        setrolD(pass);


    }

    const resivirCredenciales =(e)=>{

        const {name,value }= e.target;

        setnewPassword({...newpassword,[name]:value})

        console.log(newpassword);
    }

    const enviarRegistro=(e)=>{

        e.preventDefault();
        
        fetch(`http://localhost:4000/v1/signos/restablecer`,{

            method:'PATCH',
            headers: {"content-Type":"application/json"},
            body: JSON.stringify({rolD,...newpassword})
            
        })

        .then(res => res.json())
        .then(resData =>{
            setRespuesta(resData);
        })
        
    }
    useEffect(()=>{

        if(respuesta){
            
            alert(respuesta);
        }

    },[respuesta]);
    return(
        <div id = "dirRegistro">
            <h3>CAMBIAR CONTRASEÑA</h3>
            <form  onSubmit={enviarRegistro}>
                <select name="" id="" onChange={RegistrarRol}>
                    <option value="0">selecione rol</option>
                    <option value="user">Usuario Generico</option>
                    <option value="admin">Administrador</option>
                </select>
                <label htmlFor="">Usuario</label>
                <input type="text" name="usuario" value ={newpassword.usuario} onChange={resivirCredenciales} />
                <label htmlFor="">Password</label>
                <input type="password" name ="password" value={newpassword.password} onChange={resivirCredenciales} />
                <input type="Submit" value= "Enviar" id ="agregar"/>
                <button onClick={goHome}>Home</button>
            </form>
        </div>
    )
}

export default Restablecer;