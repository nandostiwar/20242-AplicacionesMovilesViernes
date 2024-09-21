import './App.css';
import Form from './components/Form';
import UserHome from './components/userHome';
import AdminHome from './components/adminHome';
import FormCambioPass from './components/FormCambioPass';
import Registrarse from './components/registrarse'; 
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (  
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Form callback={setUser}/>}></Route>
        <Route path='/userHome' element={<UserHome user={user}/>}></Route>
        <Route path='/adminHome' element={<AdminHome user={user}/>}></Route>
        <Route path="/cambioPass" element={<FormCambioPass />} />
        <Route path="/registrarse" element={<Registrarse />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App