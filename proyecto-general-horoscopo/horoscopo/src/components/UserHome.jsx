import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState } from "react";
import AdminHome from "./AdminHome.jsx";





function UserHome({user,enviarTexto}){
    if(user!=="user" || !user){
        return <Navigate to="/"/>
    }
    const home = useNavigate(enviarTexto);
    const [textoSigno, setTextoSigno] = useState('');
    

    function goHome(){
        home("/");
    }

    async function handleSelect(event){
        const signo1 = event.target.value;

         for(let i= 0; i < enviarTexto.length; i++){

            const {signo} =enviarTexto[i]

            if(signo === signo1){
                const {texto} = enviarTexto[i];
                setTextoSigno(texto)
            }
        }
        
        console.log(textoSigno);
        // setTextoSigno("")

            
     
        
    //     for(let i = 0; i< almacnarArry.length; i++){
            
    //     if (almacnarArry[i].signo == signo){

    //     setTextoSigno(almacnarArry[i].texto)


    // }


    // }   

       


    
        
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3></div>
            <select id="selectSignos" onClick={handleSelect}>
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
            <TextSigno texto={textoSigno}/>
            <button id="btnHome" onClick={goHome}>Home</button>
          
           
            
        </div>
         
        
        
    )
}

export default UserHome;