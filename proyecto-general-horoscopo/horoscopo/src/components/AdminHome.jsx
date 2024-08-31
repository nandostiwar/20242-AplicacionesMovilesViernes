import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css';
import { useState, useEffect } from "react";

function AdminHome({ user }) {
    const navigate = useNavigate();
    const [signos, setSignos] = useState(() => JSON.parse(localStorage.getItem('signos')) || {});
    const [signoEditar, setSignoEditar] = useState("");
    const [genero, setGenero] = useState("hombre"); // Género por defecto
    const [textoEditar, setTextoEditar] = useState("");

    if (user !== 'admin') return <Navigate to="/" />;

    useEffect(() => {
        localStorage.setItem('signos', JSON.stringify(signos));
    }, [signos]);

    const handleSelectSigno = (event) => {
        const signo = event.target.value;
        setSignoEditar(signo);
        setTextoEditar(signos[signo]?.[genero] || "");
    };

    const handleSelectGenero = (event) => {
        const generoSeleccionado = event.target.value;
        setGenero(generoSeleccionado);
        if (signoEditar) {
            setTextoEditar(signos[signoEditar]?.[generoSeleccionado] || "");
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (!signoEditar || !textoEditar.trim()) {
            alert("Por favor, completa los campos.");
            return;
        }
        setSignos(prevSignos => ({
            ...prevSignos,
            [signoEditar]: {
                ...prevSignos[signoEditar],
                [genero]: textoEditar
            }
        }));
        alert(`Texto para ${signoEditar} (${genero}) actualizado correctamente.`);
        setTextoEditar("");
    };

    return (
        <div className="container">
            <h2 id="textoAdmin">Edita un Signo Zodiacal</h2>
            <select id="editSignos" onChange={handleSelectSigno} defaultValue="0">
                <option value="0" disabled>Selecciona un signo zodiacal</option>
                {["Aries", "Geminis", "Cancer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"].map(signo => (
                    <option key={signo} value={signo}>{signo}</option>
                ))}
            </select>

            <select id="selectGenero" onChange={handleSelectGenero} value={genero}>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
                <option value="niño">Niño</option>
            </select>

            <textarea
                id="textoEditar"
                cols="50"
                rows="10"
                onChange={(e) => setTextoEditar(e.target.value)}
                value={textoEditar}>
            </textarea>
            <button id="btnEditar" onClick={handleClick}>Editar</button>
            <button id="btnHomeAdmin" onClick={() => navigate("/")}>Home</button>
        </div>
    );
}

export default AdminHome;