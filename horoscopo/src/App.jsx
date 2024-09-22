import './App.css';
import Form from './Form/Form.jsx';
import UserHome from './page/userPage/UserHome.jsx';
import AdminHome from './page/adminPage/AdminHome.jsx';
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
