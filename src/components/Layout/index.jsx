// Layout.jsx
import React, { useContext } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { MyContext } from "../../App";



const Layout = ({ children }) => {
    const {isSidebarOpen,windowWidth,sidebarWidth}=useContext(MyContext)
  return (
    <section className="main">
      <Header />
      <div className="contentMain flex">
        <div
          className={`sidebarWrapper overflow-hidden transition-all
            ${
              windowWidth < 992
                ? `fixed top-0 left-0 h-full z-110 bg-white 
                   ${isSidebarOpen ? 'w-[80%] opacity-100' : 'w-0 opacity-0'}`
                : `${isSidebarOpen ? `w-[${sidebarWidth || 18}%]` : 'w-0 opacity-0'}`
            }
          `}
        >
          <Sidebar />
        </div>

        <div
          className={`contentRight py-4 px-2 md:px-5`}
          style={{
            width: isSidebarOpen
              ? windowWidth < 992
                ? "0%" // hide content when sidebar overlays
                : `${100 - (sidebarWidth || 18)}%`
              : "100%",
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default Layout;
