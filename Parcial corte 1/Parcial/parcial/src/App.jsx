import './App.css';
import Login from './components/login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Admin from './components/UsuarioAdmin';
import Usuario from './components/UsuarioNormal';
import CambiarContrasena from './components/CambiarContrasena';

function App() {
  return (  
    <BrowserRouter>
      
      <Routes>
        <Route index element={<Login/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/usuario' element={<Usuario/>}></Route>
        <Route path='/cambiar-contrasena' element={<CambiarContrasena/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
