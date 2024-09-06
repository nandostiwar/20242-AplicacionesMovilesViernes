import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState } from "react";

function UserHome({user}){
    if(user!=="user" || !user){
        return <Navigate to="/"/>
    }
    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');
    const [categoriaU, setcategoriaU] = useState("");

    function goHome(){
        home("/");
    }

    const SelecCategori = (event)=>{

        const categ = event.target.value;
        if (categ!="0"){
            setcategoriaU(categ);
        }


    }

    async function handleSelect(event){
        const signoU = event.target.value;
        if(signoU!=="0"){
            fetch(`http://localhost:4000/v1/signos/${categoriaU}/${signoU}`)
                .then(response => response.json())
                .then(responseData => setTextoSigno(responseData))
        } 
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3></div>
            <h2 id="textoAdmin">Seleccione Categoria</h2>
            <select id="editSignos" onClick={SelecCategori}>
                <option value="0">Selecione </option>
                <option value="Nino">Niño</option>
                <option value="Nino">Niña</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
            </select>
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