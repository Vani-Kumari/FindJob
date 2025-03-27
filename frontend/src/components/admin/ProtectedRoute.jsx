import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  // Example using Redux
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // You can also use localStorage if you are not using Redux
  // const user = JSON.parse(localStorage.getItem('user'));
  // const isLoggedIn = !!localStorage.getItem('authToken');

  if (!isLoggedIn || !user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
