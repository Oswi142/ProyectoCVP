import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Borrar token y rol del almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // ✅ Redirigir al usuario a la página de login
    navigate('/login');
  };

  return <button onClick={handleLogout}>Cerrar Sesión</button>;
};

export default LogoutButton;
