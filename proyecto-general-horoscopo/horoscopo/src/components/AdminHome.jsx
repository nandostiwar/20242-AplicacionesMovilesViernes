import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css'
import { useState } from "react";
import UserHome from "./UserHome";




function AdminHome({user, setenviarTexto}){// cambio
    if(user!=='admin' || !user){
        return <Navigate to="/"/>
    }
    const home = useNavigate();
    
    const [textoEditar, setTextoEditar] = useState("");
    const [signoEditar, setSignoEditar] = useState("");
    const [almacnarArry, setalmacnarArry]=useState([]);
    
    const almacenarobj= {
        signo:"",
        texto:""
    }

    almacenarobj.signo=signoEditar
    almacenarobj.texto=textoEditar

    function handleSelect(event){
        const signo = event.target.value;
        if(signo!=="0"){
            setSignoEditar(signo);
        } 
    }

    function goHome(){
        home("/");
    }

    function handleClick(e){
        
        e.preventDefault();
        
        if (almacenarobj){
            
            setalmacnarArry([...almacnarArry, almacenarobj]);
            
            console.log(almacnarArry)
        }
    }

    const enviar=()=>{
        
        alert("se envio")
        setenviarTexto(almacnarArry);

    }

    return (
        <div class="container">
            <h2 id="textoAdmin">Edita un Signo Zodiacal</h2>
            <select id="editSignos" onClick={handleSelect}>
                <option value="0">Seleciona un signo zodiacal</option>
                <option value="Aries">Aries</option>
                <option value="Geminis">Géminis</option>
                <option value="Cancer">Cáncer</option>
                <option value="Leo">Leo</option>
                <option value="Virgo">Virgo</option>
                <option value="Libra">Libra</option>
                <option value="Escorpio">Escorpio</option>
                <option value="Sagitario">Sagitario</option>
                <option value="Capricornio">Capricornio</option>
                <option value="Acuario">Acuario</option>
                <option value="Piscis">Piscis</option>
            </select>
            <textarea id="textoEditar" cols="50" rows="10" onChange={(e)=> setTextoEditar(e.target.value)}>

            </textarea>
            <button id="btnEditar" onClick={handleClick} >Editar</button>
            <button id="btnEditar" onClick={enviar} >Enviar</button>
            <button id="btnHomeAdmin" onClick={goHome}>Home</button>
           
        </div>
    )
}



export default AdminHome;