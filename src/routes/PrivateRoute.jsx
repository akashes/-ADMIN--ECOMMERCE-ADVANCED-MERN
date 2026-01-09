import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isLogin, loading, token,authChecked } = useSelector((state) => state.auth);
  console.log(isLogin, loading, authChecked);

  // if(!localStorage.getItem('admin_accessToken')){
  //   <Navigate to={'login'} />
  // }

  // if (loading || !authChecked) {
  //   return (
  //   <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
  //       <img src="/ecommerce.png" className="w-16 h-16 animate-pulse mb-4" alt="Logo" />
  //       <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
  //         <div className="h-full bg-blue-600 animate-progress"></div>
  //       </div>
  //     </div>
  //   );
  // }

  // return isLogin ? children : <Navigate to="/login" replace />;
  // 1. If we have a token (from Redux Persist), let them in immediately
  if (isLogin || token) {
    return children;
  }

  // 2. Only show loading if we don't even have a persisted token 
  // and we are currently checking.
  if (!authChecked) {
 <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
         <img src="/ecommerce.png" className="w-16 h-16 animate-pulse mb-4" alt="Logo" />
         <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
           <div className="h-full bg-blue-600 animate-progress"></div>
         </div>
      </div>  }

  // 3. If check finished and no login/token found, redirect
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
