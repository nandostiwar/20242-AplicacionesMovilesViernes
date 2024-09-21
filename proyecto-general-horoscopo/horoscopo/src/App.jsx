import './App.css';
import Form from './components/Form';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import DataHome from './components/DataHome';
import NewHome from './components/NewHome';

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
        <Route path='/newHome' element={<NewHome user={user}/>}></Route>
        <Route path='/dataHome' element={<DataHome user={user}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
