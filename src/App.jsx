
import { createBrowserRouter,Router,RouterProvider } from 'react-router'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { createContext, useState } from 'react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'


export const MyContext = createContext()

function App() {
  const[isSidebarOpen,setIsSidebarOpen]=useState(false)
  const[isLogin,setIsLogin]=useState(false)
  
  const values={
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin
  }
  
const router = createBrowserRouter([
  {
    path:'/',
   element: 
   <>
   <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div  

      className={`sidebarWrapper overflow-hidden
        ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
        transition-all
        `}
      >
        <Sidebar/>
      </div>
      <div className={`contentRight py-4 px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
        <Dashboard />
      </div>
    </div>
    
   </section>
   </>
  },
  {
    path:'/login',
   element: 
   <Login/>
  },
  {
    path:'/sign-up',
   element: 
   <SignUp/>
  },

])  

console.log(isSidebarOpen)
  return (
    <>
    <MyContext.Provider value={values}>

      <RouterProvider router={router} />
    </MyContext.Provider>
    </>
  )
}

export default App
