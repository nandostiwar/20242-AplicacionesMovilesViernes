import Form from './components/Form';
import Useradmin from './components/useradmin';
import Usercliente from './components/usercliente';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App(){
    const [user,setUser]=useState(null);
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<Form callback={setUser}/>}></Route>
                <Route path='/useradmin' element={<Useradmin user={user}/>}></Route>
                <Route path='/usercliente' element={<Usercliente user={user}/>}></Route>
            </Routes>
        </BrowserRouter>

    )
}

export default App;