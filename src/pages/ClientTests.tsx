import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientTests: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <h1>📝 Bienvenido a la sección de Tests</h1>
      <p>Aquí podrás realizar diferentes tests vocacionales.</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default ClientTests;
