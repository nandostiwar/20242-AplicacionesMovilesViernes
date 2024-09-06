import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css';

function AdminHome({ user }) {
    if (user !== 'admin' || !user) {
        return <Navigate to="/" />;
    }

    const home = useNavigate();
    const [textoEditar, setTextoEditar] = useState("");
    const [signoEditar, setSignoEditar] = useState("");
    const [descripciones, setDescripciones] = useState({});

    useEffect(() => {
        const storedData = localStorage.getItem('signos');
        if (storedData) {
            setDescripciones(JSON.parse(storedData));
        } else {
            // Si no hay datos en `localStorage`, inicializa con datos por defecto
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

    function handleSelect(event) {
        const signo = event.target.value;
        if (signo !== "0") {
            setSignoEditar(signo);
            setTextoEditar(descripciones[signo] || '');
        }
    }

    function goHome() {
        home("/");
    }

    function handleClick(e) {
        e.preventDefault();
        setDescripciones(prev => {
            const updatedDescripciones = { ...prev, [signoEditar]: textoEditar };
            localStorage.setItem('signos', JSON.stringify(updatedDescripciones));
            alert("Código editado correctamente.");
            return updatedDescripciones;
        });
    }

    return (
        <div className="container">
            <h2 id="textoAdmin">Edita un Signo Zodiacal</h2>
            <select id="editSignos" onChange={handleSelect}>
                <option value="0">Selecciona un signo zodiacal</option>
                <option value="Aries">Aries</option>
                <option value="Géminis">Géminis</option>
                <option value="Cáncer">Cáncer</option>
                <option value="Leo">Leo</option>
                <option value="Virgo">Virgo</option>
                <option value="Libra">Libra</option>
                <option value="Escorpio">Escorpio</option>
                <option value="Sagitario">Sagitario</option>
                <option value="Capricornio">Capricornio</option>
                <option value="Acuario">Acuario</option>
                <option value="Piscis">Piscis</option>
            </select>
            <textarea
                id="textoEditar"
                cols="50"
                rows="10"
                value={textoEditar}
                onChange={(e) => setTextoEditar(e.target.value)}
            />
            <button id="btnEditar" onClick={handleClick}>Editar</button>
            <button id="btnHomeAdmin" onClick={goHome}>Home</button>
        </div>
    );
}

export default AdminHome;