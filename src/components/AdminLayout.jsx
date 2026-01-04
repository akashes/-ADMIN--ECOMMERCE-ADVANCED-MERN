import { Outlet } from 'react-router-dom'; // Note: react-router-dom, not react-router
import Header from './Header';
import Sidebar from './Sidebar';
import { useContext } from 'react';
import { MyContext } from '../App'; // Import your context
import GlobalModal from './GlobalModal';

const AdminLayout = () => {
  const { isSidebarOpen, windowWidth, sidebarWidth } = useContext(MyContext);

  return (
    <section className="main">
      <Header />
      <div className="contentMain flex">
        {/* Sidebar Wrapper */}
        <div
          className={`sidebarWrapper overflow-hidden transition-all duration-300
            ${isSidebarOpen 
               ? (windowWidth < 992 ? 'w-[100%] fixed z-50 bg-white h-full' : 'w-[18%]') 
               : 'w-0 opacity-0'
            }`}
        >
          <Sidebar />
        </div>

        {/* Dynamic Content Area (The specific page goes here) */}
        <div
          className={`contentRight py-4 px-2 md:px-5 transition-all duration-300 flex-1`}
           // Using style for dynamic width is safer than Tailwind arbitrary values
          style={{ 
             width: isSidebarOpen && windowWidth >= 992 ? `${100 - sidebarWidth}%` : '100%' 
          }}
        >
          {/* <Outlet> acts as a placeholder for child routes */}
          <Outlet />
        </div>
      </div>
      <GlobalModal/>
    </section>
  );
};

export default AdminLayout;