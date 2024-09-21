import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css'
import { useState } from "react";

function AdminHome({user}){
    if(user!=='admin' || !user){
        return <Navigate to="/"/>
    }
    const home = useNavigate();
    const [textoEditar, setTextoEditar] = useState("");
    const [signoEditar, setSignoEditar] = useState("");
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("");

    function handleSelectSigno(event){
        const signo = event.target.value;
        if(signo !== "0"){
            setSignoEditar(signo);
        } 
    }

    function handleSelectOpcion(event) {
        const opcion = event.target.value;
        if(opcion !== "0"){
            setOpcionSeleccionada(opcion);
        }
    }

    function goHome(){
        home("/");
    }

    function handleClick(e){
        e.preventDefault();
        fetch(`http://localhost:4000/v1/signos/${signoEditar}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"textoEditar": textoEditar})
        })
    }

    return (
        <div className="container">
            <h2 id="textoAdmin">Edita un Signo Zodiacal</h2>
            <select id="editSignos" onChange={handleSelectSigno}>
                <option value="0">Selecciona un signo zodiacal</option>
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
            
            

            {/* El textarea correspondiente para la edición */}
            <textarea id="textoEditar" cols="50" rows="10" onChange={(e)=> setTextoEditar(e.target.value)}>
            </textarea>

            {/* Botones después de las opciones */}
            <button id="btnEditar" onClick={handleClick}>Editar</button>
            <button id="btnHomeAdmin" onClick={goHome}>Home</button>
        </div>
    )
}

export default AdminHome;
