import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { MdOutlineLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../features/auth/authSlice';
import { showSuccess } from '../../utils/toastUtils';

const ForgotPassword = () => {
    const{loading}=useSelector(state=>state.auth)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
const[email,setEmail]=useState('');

const handleGetOtp=async(e)=>{
    e.preventDefault()
    const resultAction =await dispatch(forgotPassword(email))
    console.log(resultAction)
    if(forgotPassword.fulfilled.match(resultAction)){
        showSuccess(resultAction.payload ||'OTP sent successfully')
navigate('/forgot-verify', {
  state: { email, message: `OTP sent to ${email}` },
  replace: true,
});
    }
    if(forgotPassword.rejected.match(resultAction)){
        showError(resultAction.payload || 'Failed to send OTP')
    }



}

useEffect(()=>{
    if(location.state && location.state.email){
        setEmail(location?.state?.email)
    }

},[location.state])

  return (
<section className="w-full h-screen flex  justify-center pt-[100px] relative">
    <header className='w-full fixed top-0 left-0 z-100 px-4 py-3 flex items-center justify-center md:justify-between'>
        <Link to='/'>
        <img src="https://serviceapi.spicezgold.com/download/1750047766437_logo.jpg" alt="" className='w-[200px]' />
        </Link>
        <div className="hidden md:flex items-center ">
            <NavLink to='/login' className={({isActive})=>isActive && '!bg-[#e8e8e8] rounded-full '}>
            <Button className='!rounded-full !text-[rgba(0,0,0,0.9)] !px-5 flex gap-1'>
                <MdOutlineLogin className='text-[20px] '/>
                Login
                </Button>
            </NavLink>
            <NavLink to='/sign-up' className={({isActive})=>isActive && '!bg-red-500'}>

            <Button className='!rounded-full !text-[rgba(0,0,0,0.9)]  !px-5 flex gap-1'>
                <FaRegUser className='text-[15px] '/>
                Sign Up
                </Button>
            </NavLink>
        </div>

    </header>
    {/* background image */}
<div className="fixed top-0 left-0 w-full h-full opacity-7 bg-[url('https://res.cloudinary.com/dllelmzim/image/upload/v1753140814/patern_z0bmzz.webp')] bg-repeat z-[-1]"></div>

    <div className="loginBox card w-[600px] h-auto pb-25 mx-auto mt-20 relative z-50 ">
        
        <div className="text-center">

        <img src="https://ecommerce-admin-view.netlify.app/icon.svg" alt="" className='m-auto' />
        </div>
        <h1 className='text-center text-[25px] md:text-[35px] font-[800] mt-4'>Having trouble signing in? <br />
        <span className='text-nowrap'>Reset your password.</span>
        </h1>
        


      


          <br />

        <form className='w-full px-8 mt-3' onSubmit={handleGetOtp} >
            <div className="form-group mb-4 w-full">
                <h4 className='text-[14px] font-[500] mb-1'>Email</h4>
                <input type="email" name="email" id="" placeholder='Enter your email'
                className='w-full h-[40px] md:h-[45px] border-2 border-[rgba(0,0,0,0.2)] rounded-md  px-3 focus:border-[rgba(0,0,0,0.5)] focus:outline-none'
                autoFocus
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
         
        
            <Button disabled={loading} type='submit' className='!capitalize btn-blue md:btn-lg w-full '>
                {
                    loading ? 'Please wait...' : 'Get OTP'
                }
            </Button>
             <div className="  flex items-center justify-center gap-2 mt-3">
                <span>Don't want to reset?</span>
                              <Link to='/login' className='text-secondary font-[700] text-[15px] hover:underline hover:text-gray-700' >
                              Sign In?
                              </Link>
            
            
                        </div>
        </form>



    </div>



   </section>
  )
}

export default ForgotPassword
