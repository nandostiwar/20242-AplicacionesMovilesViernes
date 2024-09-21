import { useNavigate } from 'react-router-dom';

function AdminHome() {
    const goTo = useNavigate();

    const volver = () => {
        goTo('/');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Bienvenido, ADMIN</h1>
            <button onClick={volver} style={{ padding: '10px 20px', marginTop: '20px' }}>Volver</button>
        </div>
    );
}

export default AdminHome;
