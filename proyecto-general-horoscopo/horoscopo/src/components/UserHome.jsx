import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState, useEffect } from "react";

function UserHome({ user }) {
    if (user !== "user" || !user) {
        return <Navigate to="/" />;
    }

    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');
    const [descripciones, setDescripciones] = useState({});

    useEffect(() => {
        // Carga los datos desde localStorage cuando el componente se monta
        const storedData = localStorage.getItem('signos');
        if (storedData) {
            setDescripciones(JSON.parse(storedData));
        } else {
            // Si no hay datos en localStorage, inicializa con datos por defecto
            const initialData = {
                Aries: "Suerte de Aries",
                Geminis: "SUERTE DE GEMINIS CAMBIADA",
                Cancer: "Suerte de Cancer",
                Leo: "SUERTE DE LEO POSITIVA",
                Virgo: "Suerte de Virgo",
                Libra: "UNA LIBRA DE ARROZ",
                Escorpio: "Suerte de Escorpio",
                Sagitario: "Suerte de Sagitario",
                Capricornio: "Suerte de Capricornio",
                Acuario: "Suerte de Acuario",
                Piscis: "Suerte de Piscis"
            };
            localStorage.setItem('signos', JSON.stringify(initialData));
            setDescripciones(initialData);
        }
    }, []);

    function goHome() {
        home("/");
    }

    function handleSelect(event) {
        const signo = event.target.value;
        if (signo !== "0") {
            setTextoSigno(descripciones[signo] || 'Descripción no disponible');
        } else {
            setTextoSigno('Descripción no disponible');
        }
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3></div>
            <select id="selectSignos" onChange={handleSelect}>
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
            <TextSigno texto={textoSigno} />
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    );
}

export default UserHome;