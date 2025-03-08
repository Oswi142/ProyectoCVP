import React from 'react';
import LogoutButton from '../components/LogoutButton';

const ClientDashboard: React.FC = () => {
  return (
    <div>
      <h1>Panel del Cliente</h1>
      <p>Bienvenido, usuario.</p>
      <LogoutButton />
    </div>
  );
};

export default ClientDashboard;
