import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState } from "react";

function UserHome({ user }) {
    if (user !== "user" || !user) {
        return <Navigate to="/" />;
    }

    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');
    const [genero, setGenero] = useState('hombre'); // Género por defecto

    function goHome() {
        home("/");
    }

    async function handleSelectSigno(event) {
        const signo = event.target.value;
        if (signo !== "0") {
            const storedSignos = JSON.parse(localStorage.getItem('signos')) || {};
            setTextoSigno(storedSignos[signo]?.[genero] || "Texto no disponible para este signo y género.");
        }
    }

    function handleSelectGenero(event) {
        const generoSeleccionado = event.target.value;
        setGenero(generoSeleccionado);
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3></div>

            <select id="selectSignos" onChange={handleSelectSigno}>
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

            <select id="selectGenero" onChange={handleSelectGenero} value={genero}>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
                <option value="niño">Niño</option>
            </select>

            <TextSigno texto={textoSigno} />
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    );
}

export default UserHome;
