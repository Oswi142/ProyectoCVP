import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Si se ingresa a la raíz, redirige a /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        {/* Agrega aquí otras rutas según tus necesidades */}
      </Routes>
    </Router>
  );
};

export default App;
