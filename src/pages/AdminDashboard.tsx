import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <h1>👑 Bienvenido al Dashboard de Admin</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default AdminDashboard;
