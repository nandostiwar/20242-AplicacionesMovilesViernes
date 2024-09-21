import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './styles/Registro.css';


const Registro = ()=>{
    const [addcredenciales,setaddcredenciales ]= useState({

        "user":"",
        "password":""
    });
    const [rol, setrol]= useState("");
    const [respuesta, setrespuesta]= useState("");
    const home = useNavigate();
    
    function goHome(){
        home("/");
    }

    const addRol =(e)=>{

        const rolasignado = e.target.value;

        if (rolasignado!="0"){
            setrol(rolasignado);
        }
    }
    const hancredenciales =(e)=>{

       const {name, value}= e.target;

       setaddcredenciales({...addcredenciales, [name]:value})
    }

    function handleClick(e){
        // console.log(signoEditar);
        // console.log(textoEditar);
        e.preventDefault();
        fetch(`http://localhost:4000/v1/signos/registro`, {
            method: 'PATCH',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({rol, ...addcredenciales})
        }) 
        .then(res => res.json())
        .then(resdata =>{
            setrespuesta(resdata);
            
        })
    }
    
    useEffect(()=>{

        if(respuesta){
            
            alert(respuesta);
        }

     },[respuesta])

     return (
        <div id ="dirRegistro">
            <h3>REGISTRO DE USUARIO</h3>
            <form onSubmit={handleClick}>
                
                <label htmlFor="">Rol</label>
                <select name="" id="" value={rol} onChange={addRol}>
                    <option value="0">Seleccionar Rol</option>
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario Generico</option>
                </select>
                <label htmlFor="">Usuario</label>
                <input type="text" name= "user" value={addcredenciales.user} onChange={hancredenciales} />
                <label htmlFor="">Contraseña</label>
                <input type="password" name = "password" value={addcredenciales.password} onChange={hancredenciales}/>
                <input type="submit" value="Agregar" id="agregar"/>
                <button onClick={goHome}>Home</button>
            </form>
        </div>
    )

}

export default Registro;