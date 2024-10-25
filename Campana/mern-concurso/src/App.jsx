// src/App.jsx o donde definas tus rutas
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile'; // Asegúrate de tener este componente

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/UserProfile" element={<UserProfile />} /> {/* Asegúrate de tener esta ruta */}
        <Route path="/register" element={<Register />} /> {/* Ruta para registro */}
      </Routes>
    </Router>
  );
};

export default App;
