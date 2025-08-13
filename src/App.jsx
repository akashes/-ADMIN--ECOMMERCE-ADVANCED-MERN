import React, { useEffect } from 'react'
import { createBrowserRouter,Router,RouterProvider } from 'react-router'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { createContext, useState } from 'react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Products from './pages/Products'

import Dialog from '@mui/material/Dialog';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { IoIosClose } from "react-icons/io";
import AddProduct from './pages/Products/AddProduct'
import HomeSliderBanners from './pages/HomeSliderBanners'
import AddHomeSlide from './pages/HomeSliderBanners/AddHomeSlide'
import CategoryList from './pages/Category'
import AddCategory from './pages/Category/AddCategory'
import SubCategoryList from './pages/Category/SubCatList'
import AddSubCategory from './pages/Category/AddSubCategory'
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
import AddAddress from './pages/Address/addAddress.jsx'
import EditCategory from './pages/Category/EditCategory.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'




export const MyContext = createContext()

function App() {
  const dispatch = useDispatch()
  const[isSidebarOpen,setIsSidebarOpen]=useState(true)
  const[isLogin,setIsLogin]=useState(false)

  const[isAddProductModalOpen,setIsAddProductModalOpen]=useState({
    open:false,
    modal:'',
    id:''
  })
  console.log(isAddProductModalOpen)
  
  const values={
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    isAddProductModalOpen,
    setIsAddProductModalOpen
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
      <div className={`contentRight py-4  px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
        <PrivateRoute>

        <Dashboard />
        </PrivateRoute>
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
    {
    path:'/products',
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
        <Products />
      </div>
    </div>
    
   </section>
   </>
  },
    {
    path:'/homeSlider/list',
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
        <HomeSliderBanners />
      </div>
    </div>
    
   </section>
   </>
  },
    {
    path:'/category/list',
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
        <CategoryList />
      </div>
    </div>
    
   </section>
   </>
  },
    {
    path:'/subCategory/list',
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
        <SubCategoryList />
      </div>
    </div>
    
   </section>
   </>
  },
    {
    path:'/users',
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
        <Users />
      </div>
    </div>
    
   </section>
   </>
  },
    {
    path:'/orders',
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
        <Orders />
      </div>
    </div>
    
   </section>
   </>
  },
    {
    path:'/forgot-password',
   element: 
   <ForgotPassword/>
  },
    {
    path:'/verify',
   element: 
   <VerifyAccount resetPassword={false} />
  },
    {
    path:'/forgot-verify',
   element: 
   <VerifyAccount resetPassword={true} />
  },
      {
    path:'/change-password',
   element: 
   <ChangePassword/>
  },
  {
    path:"/reset-password",
    element:<ResetPassword/>
  },
   {
    path:'/profile',
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
        <Profile />
      </div>
    </div>
    
   </section>
   </>
  },

   {
    path:'/product/:id',
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
        <ProductDetails />
      </div>
    </div>
    
   </section>
   </>
  },



])  



  useEffect(() => {
    dispatch(tryAutoLogin());
  }, []);
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
