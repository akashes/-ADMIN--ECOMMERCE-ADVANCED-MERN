import React, { useEffect } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router'
import Dashboard from './pages/Dashboard'

import { createContext, useState } from 'react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Products from './pages/Products'



import HomeSliderBanners from './pages/HomeSliderBanners'
import CategoryList from './pages/Category'
import SubCategoryList from './pages/Category/SubCatList'
import Users from './pages/Users'
import Orders from './pages/Orders'

import {Toaster} from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { tryAutoLogin } from './features/auth/authSlice'
import PrivateRoute from './routes/PrivateRoute'
import Profile from './pages/Profile'

import ProductDetails from './pages/Products/ProductDetails.jsx'
import BannerV1 from './pages/Banners/index.jsx'
import BlogList from './pages/Blog/index.jsx'
import ForgotPassword from './pages/ForgotPassword/index.jsx'
import ResetPassword from './pages/ResetPassword/index.jsx'
import verifyAccount from './pages/verifyAccount/index.jsx'
import './App.css'
import './responsive.css'
import OrderTracking from './components/OrderTracking/index.jsx'
import ChangePassword from './pages/ChangePassword/index.jsx'

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
        { path: 'subCategory/list', element: <SubCategoryList /> },
        { path: 'bannerV1/list', element: <BannerV1 /> },
        { path: 'blog/list', element: <BlogList /> },
        { path: 'profile', element: <Profile /> },
        
        //  admin routes 
      ]
    },
    // Public Routes (No Sidebar/Header)
    { path: 'forgot-password', element: <ForgotPassword/> },
    { path: 'forgot-verify', element : <verifyAccount resetPassword={true}/> },
    { path: 'reset-password', element : <ResetPassword /> },
    { path: 'verify', element : <verifyAccount resetPassword={false} /> },
    { path: 'change-password', element : <ChangePassword /> },
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
