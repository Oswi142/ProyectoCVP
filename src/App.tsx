import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import ProtectedRoute from './components/ProtectedRoutes'; // Ensure this file exists at the specified path

// Páginas de los tests
import Entrevista from './pages/tests/Entrevista';
import IPPR from './pages/tests/IPPR';
import CHASIDE from './pages/tests/CHASIDE';
import DAT from './pages/tests/DAT';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas para admin */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Rutas protegidas para client */}
        <Route element={<ProtectedRoute allowedRoles={['client']} />}>
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/test/entrevista" element={<Entrevista />} />
          <Route path="/test/ippr" element={<IPPR />} />
          <Route path="/test/chaside" element={<CHASIDE />} />
          <Route path="/test/dat" element={<DAT />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
