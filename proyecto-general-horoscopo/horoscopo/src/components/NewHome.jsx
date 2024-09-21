import { useState } from "react";
//import { useRouter } from "next/navigation";
import './styles/NewHome.css'

function NewHome() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function goHome() {
        router.push("/");
    }

    async function handleRegister(e) {
        e.preventDefault();
        if (!username || !password || !email) {
            setErrorMessage("Por favor, complete todos los campos.");
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/v1/signos/register', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ username, password, email })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Usuario registrado exitosamente");
                router.push("/");
            } else {
                setErrorMessage(data.message || "Error al registrar usuario");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setErrorMessage("Error al conectar con el servidor");
        }
    }

    return (
        <div className="container">
            <h2 id="textoRegistro">Registrar Nuevo Usuario</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="username">Nombre de Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" id="btnRegistrar">Registrar</button>
            </form>
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    )
}

export default NewHome;