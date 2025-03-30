import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton'; // si usas botón de cerrar sesión

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Panel del Cliente</h1>
      <p>Bienvenido, selecciona el test que deseas realizar:</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
        <button onClick={() => navigate('/test/entrevista')}>Entrevista</button>
        <button onClick={() => navigate('/test/ippr')}>Test IPPR</button>
        <button onClick={() => navigate('/test/chaside')}>Test CHASIDE</button>
        <button onClick={() => navigate('/test/dat')}>Test DAT</button>
      </div>

      {/* Opcional: botón para cerrar sesión */}
      <div style={{ marginTop: '2rem' }}>
        <LogoutButton />
      </div>
    </div>
  );
};

export default ClientDashboard;
