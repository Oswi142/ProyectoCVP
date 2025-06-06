import React from 'react';
import LogoutButton from '../components/LogoutButton';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>Bienvenido, admin.</p>
      <LogoutButton />
    </div>
  );
};

export default AdminDashboard;
