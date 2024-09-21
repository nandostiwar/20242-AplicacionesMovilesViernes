import './App.css';
import Login from './components/login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Administrador from './components/UsuarioAdmin';
import Usuarionoadministrador from './components/UsuarioNormal';
import CambiarContrasena from './components/CambiarContrasena';

function App() {
  return (  
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Login/>}></Route>
        <Route path='/Administrador' element={<Administrador/>}></Route>
        <Route path='/Usuarionoadministrador' element={<Usuarionoadministrador/>}></Route>
        <Route path='/cambiodecontrasena' element={<CambiarContrasena/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
