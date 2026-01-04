import React, { useEffect } from 'react'
import { createBrowserRouter,Router,RouterProvider } from 'react-router'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { createContext, useState } from 'react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Products from './pages/Products'



import HomeSliderBanners from './pages/HomeSliderBanners'
import CategoryList from './pages/Category'
import SubCategoryList from './pages/Category/SubCatList'
import Users from './pages/Users'
import Orders from './pages/Orders'
import ForgotPassword from './pages/ForgotPassword'
import VerifyAccount from './pages/verifyAccount'
import ChangePassword from './pages/ChangePassword'
import {Toaster} from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { tryAutoLogin } from './features/auth/authSlice'
import PrivateRoute from './routes/PrivateRoute'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'

import ProductDetails from './pages/Products/ProductDetails.jsx'
import BannerV1 from './pages/Banners/index.jsx'
import BlogList from './pages/Blog/index.jsx'

import './App.css'
import './responsive.css'
import OrderTracking from './components/OrderTracking/index.jsx'

import AdminLayout from './components/AdminLayout.jsx'
export const MyContext = createContext({
  isSidebarOpen:window.innerWidth>=992,
  windowWidth:window.innerWidth,
  sidebarWidth:18 
})

function App() {
  const dispatch = useDispatch() 
  const[isLogin,setIsLogin]=useState(false)
  const[windowWidth,setWindowWidth]=useState(window.innerWidth)
  const[isSidebarOpen,setIsSidebarOpen]=useState(window.innerWidth>=992)
  const[sidebarWidth,setSidebarWidth]=useState(18)

  const[isAddProductModalOpen,setIsAddProductModalOpen]=useState({
    open:false,
    modal:'',
    id:''
  })
  console.log(isAddProductModalOpen)

  console.log('sidebaropen',isSidebarOpen)
  console.log('windowWidth',windowWidth)
  
  const values={
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    isAddProductModalOpen,
    setIsAddProductModalOpen,
    windowWidth,
    setSidebarWidth,
    sidebarWidth
  }

// const router = createBrowserRouter([
//   {
//     path:'/',
//    element: 
//    <PrivateRoute>

//    <>
//    <section className="main">
//     <Header/>
//     <div className="contentMain flex">
//       <div  
//  //
//       className={`sidebarWrapper overflow-hidden
//         ${isSidebarOpen===true  ? windowWidth<992? `  w-[${sidebarWidth/1.5}%]`:`w-[${sidebarWidth}%]`:'w-0 opacity-0  '}
//         transition-all
//         `}
//       >
//         <Sidebar/>
     

//       </div>
//       <div className={`contentRight py-4  px-5 
//         //  ${isSidebarOpen===false?'w-[100%]':`w-[82%]`}
//         ${isSidebarOpen===true && windowWidth<992 && 'opacity-0' }
        
//           `}
//           style={{width:`w-[${isSidebarOpen?100-sidebarWidth:100}%]`}}
//            >

//         <Dashboard />
//       </div>
//     </div>
    
//    </section>
//    </>
//    </PrivateRoute>

//   },
//   {
//     path:'/login',
//    element: 
//    <Login/>
//   },
//   {
//     path:'/sign-up',
//    element: 
//    <SignUp/>
//   },
//     {
//     path:'/products',
//    element: 
//    <>
//    <section className="main">
//     <Header/>
//     <div className="contentMain flex">
//       <div  

//       className={`sidebarWrapper overflow-hidden
//         ${isSidebarOpen===true?'w-[18%] ':'w-0 opacity-0  '}
//         transition-all
//         `}
//       >
//         <Sidebar/>
//       </div>
//       <div className={`contentRight py-4 px-2 md:px-5
//           ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `}
//            >
//         <Products />
//       </div>
//     </div>
    
//    </section>
//    </>
//   },
//     {
//     path:'/homeSlider/list',
//    element: 
//    <>
//    <section className="main">
//     <Header/>
//     <div className="contentMain flex">
//       <div  

//       className={`sidebarWrapper overflow-hidden
//         ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
//         transition-all
//         `}
//       >
//         <Sidebar/>
//       </div>
//       <div className={`contentRight py-4 px-2  md:px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
//         <HomeSliderBanners />
//       </div>
//     </div>
    
//    </section>
//    </>
//   },
//     {
//     path:'/category/list',
//    element: 
//    <>
//    <section className="main">
//     <Header/>
//     <div className="contentMain flex">
//       <div  

//       className={`sidebarWrapper overflow-hidden
//         ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
//         transition-all
//         `}
//       >
//         <Sidebar/>
//       </div>
//       <div className={`contentRight py-4 px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
//         <CategoryList />
//       </div>
//     </div>
    
//    </section>
//    </>
//   },
//     {
//     path:'/subCategory/list',
//    element: 
//    <>
//    <section className="main">
//     <Header/>
//     <div className="contentMain flex">
//       <div  

//       className={`sidebarWrapper overflow-hidden
//         ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
//         transition-all
//         `}
//       >
//         <Sidebar/>
//       </div>
//       <div className={`contentRight py-4 px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
//         <SubCategoryList />
//       </div>
//     </div>
    
//    </section>
//    </>
//   },
//     {
//     path:'/users',
//    element: 
//    <>
//    <section className="main">
//     <Header/>
//     <div className="contentMain flex">
//       <div  

//       className={`sidebarWrapper overflow-hidden
//         ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
//         transition-all
//         `}
//       >
//         <Sidebar/>
//       </div>
//       <div className={`contentRight py-4 px-2 md:px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
//         <Users />
//       </div>
//     </div>
    
//    </section>
//    </>
//   },
//     {
//     path:'/orders',
//    element: 
//    <>
//    <section className="main">
//     <Header/>
//     <div className="contentMain flex">
//       <div  

//       className={`sidebarWrapper overflow-hidden
//         ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
//         transition-all
//         `}
//       >
//         <Sidebar/>
//       </div>
//       <div className={`contentRight py-4  px-2 md:px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
//         <Orders />
//       </div>
//     </div>
    
//    </section>
//    </>
//   },
//     {
//     path:'/order/:orderId',
//    element: 
//    <>
//    <section className="main">
//     <Header/>
//     <div className="contentMain flex">
//       <div  

//       className={`sidebarWrapper overflow-hidden
//         ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
//         transition-all
//         `}
//       >
//         <Sidebar/>
//       </div>
//       <div className={`contentRight py-4 px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
//         <OrderTracking />
//       </div>
//     </div>
    
//    </section>
//    </>
//   },
//     {
//     path:'/forgot-password',
//    element: 
//    <ForgotPassword/>
//   },
//     {
//     path:'/verify',
//    element: 
//    <VerifyAccount resetPassword={false} />
//   },
//     {
//     path:'/forgot-verify',
//    element: 
//    <VerifyAccount resetPassword={true} />
//   },
//       {
//     path:'/change-password',
//    element: 
//    <ChangePassword/>
//   },
//   {
//     path:"/reset-password",
//     element:<ResetPassword/>
//   },
//    {
//     path:'/profile',
//    element: 
//    <>
//    <section className="main">
//     <Header/>
//     <div className="contentMain flex">
//       <div  

//         className={`sidebarWrapper
//     transition-all duration-300
//     ${windowWidth < 992 
//         ? `fixed top-0 left-0 h-full z-110 bg-white 
//            ${isSidebarOpen ? 'w-[80%] opacity-100' : 'w-0 opacity-0'}`
//         : `${isSidebarOpen ? 'w-[18%]' : 'w-0 opacity-0'}`
//     }
//   `}
//       >
//         <Sidebar/>
//       </div>
//       <div className={`contentRight py-4 px-2  md:px-5  ${isSidebarOpen===false?`w-[100%]`:'w-[100%]'} `} >
//         <Profile />
//       </div>
//     </div>
    
//    </section>
//    </>
//   },

//    {
//     path:'/product/:id',
//    element: 
//    <>
//    <section className="main">
//     <Header/>
//     <div className="contentMain flex">
//       <div  

//       className={`sidebarWrapper overflow-hidden
//         ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
//         transition-all
//         `}
//       >
//         <Sidebar/>
//       </div>
//       <div className={`contentRight py-4 px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
//         <ProductDetails />
//       </div>
//     </div>
    
//    </section>
//    </>
//   },
//    {
//     path:'/bannerV1/list',
//    element: 
//    <>
//    <section className="main">
//     <Header/>
//     <div className="contentMain flex">
//       <div  

//       className={`sidebarWrapper overflow-hidden
//         ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
//         transition-all
//         `}
//       >
//         <Sidebar/>
//       </div>
//       <div className={`contentRight py-4  px-1 md:px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
//         <BannerV1 />
//       </div>
//     </div>
    
//    </section>
//    </>
//   },
//    {
//     path:'/blog/list',
//    element: 
//    <>
//    <section className="main">
//     <Header/>
//     <div className="contentMain flex">
//       <div  

//       className={`sidebarWrapper overflow-hidden
//         ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
//         transition-all
//         `}
//       >
//         <Sidebar/>
//       </div>
//       <div className={`contentRight py-4 px-1  md:px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
//         <BlogList />
//       </div>
//     </div>
    
//    </section>
//    </>
//   },



// ])  


const router = createBrowserRouter([
    {
      path: '/',
      // Wrapping the layout in PrivateRoute
      element: (
        <PrivateRoute>
           <AdminLayout />
        </PrivateRoute>
      ),
      // All these pages will be rendered inside the <Outlet />
      children: [
        { path: '', element: <Dashboard /> },
        { path: 'products', element: <Products /> },
        { path: 'product/:id', element: <ProductDetails /> },
        { path: 'users', element: <Users /> },
        { path: 'orders', element: <Orders /> },
        { path: 'order/:orderId', element: <OrderTracking /> },
        { path: 'category/list', element: <CategoryList /> },
        { path: 'homeSlider/list', element: <HomeSliderBanners /> },
        // ... add the rest of your admin routes here
      ]
    },
    // Public Routes (No Sidebar/Header)
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/sign-up',
      element: <SignUp />
    },
  ]);



  useEffect(() => {
    dispatch(tryAutoLogin());
  }, []);


  useEffect(()=>{
    const handleResize=()=>{
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize',handleResize)

    return()=>{
      window.removeEventListener('resize',handleResize)
    }

  },[])

  useEffect(()=>{

    if(windowWidth<992){
      setIsSidebarOpen(false)
      setSidebarWidth(90)
    }else{
      setSidebarWidth(18)
    }

  },[windowWidth])
  return (
    <>
    <MyContext.Provider value={values}>
      <Toaster reverseOrder={true} />

      <RouterProvider router={router} />


      
    </MyContext.Provider>
    </>
  )
}

export default App
