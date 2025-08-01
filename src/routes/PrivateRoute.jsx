import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isLogin, loading, authChecked } = useSelector((state) => state.auth);

  if (loading || !authChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Checking authentication...</p>
      </div>
    );
  }

  return isLogin ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
