import { useNavigate } from 'react-router-dom';

function UserHome() {
    const goTo = useNavigate();

    const volver = () => {
        goTo('/');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Bienvenido, USER</h1>
            <button onClick={volver} style={{ padding: '10px 20px', marginTop: '20px' }}>Volver</button>
        </div>
    );
}

export default UserHome;
