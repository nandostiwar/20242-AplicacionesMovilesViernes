import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState } from "react";

function UserHome({ user }) {
    if (user !== "user" || !user) {
        return <Navigate to="/" />
    }
    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');
    const [signoSeleccionado, setSignoSeleccionado] = useState('0');
    const [perfilSeleccionado, setPerfilSeleccionado] = useState('0');

    function goHome() {
        home("/");
    }

    async function handleSignoSelect(event) {
        const signo = event.target.value;
        setSignoSeleccionado(signo);
        if (signo !== "0" && perfilSeleccionado !== "0") {
            fetchSignoData(signo, perfilSeleccionado);
        }
    }

    async function handlePerfilSelect(event) {
        const perfil = event.target.value;
        setPerfilSeleccionado(perfil);
        if (perfil !== "0" && signoSeleccionado !== "0") {
            fetchSignoData(signoSeleccionado, perfil);
        }
    }

    function fetchSignoData(signo, perfil) {
        fetch(`http://localhost:4000/v1/signos/${signo}/${perfil}`)
            .then(response => response.json())
            .then(responseData => setTextoSigno(responseData))
            .catch(error => console.error("Error fetching data:", error));
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3></div>
            <div id="Selects">
                <select id="selectSignos" onClick={handleSignoSelect}>
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
                <select id="selectPerfil" onClick={handlePerfilSelect}>
                    <option value="0">Seleciona un perfil</option>
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                    <option value="Nino">Niño</option>
                </select>
                <TextSigno texto={textoSigno} />
                <button id="btnHome" onClick={goHome}>Home</button>
            </div>
        </div>
    )
}

export default UserHome;