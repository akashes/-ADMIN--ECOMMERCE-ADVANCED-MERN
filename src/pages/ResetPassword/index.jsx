import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { MdOutlineLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';
import {   resetPassword } from '../../features/auth/authSlice';



const ResetPassword = () => {
    const{loading}=useSelector(state=>state.auth)
const[isPasswordShow,setIsPasswordShow]=useState(false);
const[password,setPassword]=useState('');

const[confirmPassword,setConfirmPassword]=useState('');
const[isConfirmPasswordShow,setIsConfirmPasswordShow]=useState(false);

const dispatch = useDispatch()
const navigate = useNavigate()
  const handleResetPassword=async(e)=>{
    e.preventDefault()
    //input validation
    if(!password || !confirmPassword){
        showWarning('Please fill all the fields')
        return
    }
    if(password.length<6 || confirmPassword.length<6){
        showWarning('Password must be at least 6 characters long')
        return
    }
    if(password!==confirmPassword){
        showWarning('Passwords does not match')
        return
    }
    const resultAction = await dispatch(resetPassword({newPassword:password,confirmPassword}))
    console.log(resultAction)
    if(resetPassword.fulfilled.match(resultAction)){
        
        showSuccess(resultAction.payload ||'Password reset successful')
        navigate('/login')
     

  } 
  if(resetPassword.rejected.match(resultAction)){
    showError(resultAction.payload ||'Password reset failed')
  }

  }
   return (
   <section className='  w-full  '>
    <header className='w-full fixed top-0 left-0 z-100 px-4 py-3 flex items-center justify-center  md:justify-between'>
        <Link to='/'>
        <img src="https://serviceapi.spicezgold.com/download/1750047766437_logo.jpg" alt="" className='w-[200px]' />
        </Link>
        <div className="hidden md:flex items-center ">
            <NavLink to='/login' className={({isActive})=>isActive ? '!bg-[#e8e8e8] rounded-full ':''}>
            <Button className='!rounded-full !text-[rgba(0,0,0,0.9)] !px-5 flex gap-1'>
                <MdOutlineLogin className='text-[20px] '/>
                Login
                </Button>
            </NavLink>
<NavLink
  to="/sign-up"
  className={({ isActive }) => isActive ? '!bg-red-500' : ''}
>

            <Button className='!rounded-full !text-[rgba(0,0,0,0.9)]  !px-5 flex gap-1'>
                <FaRegUser className='text-[15px] '/>
                Sign Up
                </Button>
            </NavLink>
        </div>

    </header>
    {/* background image */}
<div className="fixed top-0 left-0 w-full h-full opacity-7 bg-[url('https://res.cloudinary.com/dllelmzim/image/upload/v1753140814/patern_z0bmzz.webp')] bg-repeat z-[-1]"></div>

    <div className="loginBox card w-full md:w-[600px] h-auto pb-25 mx-auto mt-20 relative z-50 ">
        <div className="text-center">

        <img src="https://ecommerce-admin-view.netlify.app/icon.svg" alt="" className='m-auto' />
        </div>
        <h1 className='text-center text-[30px] md:text-[35px] font-[800] mt-2 md:mt-4'>Reset Your Password <br />
        <span className='text-nowrap'>from here!</span>
        </h1>
        {/* google signin button */}
      
 
          <br />

        <form className='w-full px-8 mt-3' 
        onSubmit={handleResetPassword}
         >
          
            <div className="form-group mb-4 w-full">
                <h4 className='text-[14px] font-[500] mb-1'>Password</h4>
               <div className='relative w-full'>
                     <input type={isPasswordShow ? 'text' : 'password'} name="password" id="password"
                className='w-full h-[45px] border-2 border-[rgba(0,0,0,0.2)] rounded-md  px-3 focus:border-[rgba(0,0,0,0.5)] focus:outline-none'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <Button className='!absolute !text-[rgba(0,0,0,0.6)] top-[50%] -translate-y-1/2 right-[10px] z-50 !rounded-full !w-[40px] !h-[40px] !min-w-[40px]'
                onClick={()=>setIsPasswordShow(!isPasswordShow)}
                >
                {
                    isPasswordShow ? <FaRegEye className='text-[18px]' /> : <FaEyeSlash className='text-[18px]' />
                }
                    

                </Button>
               </div>
               
            </div>
            <div className="form-group mb-4 w-full">
                <h4 className='text-[14px] font-[500] mb-1'>Confirm Password</h4>
               <div className='relative w-full'>
                     <input type={isConfirmPasswordShow ? 'text' : 'password'} name="confirm-password" id="confirm-password"
                className='w-full h-[45px] border-2 border-[rgba(0,0,0,0.2)] rounded-md  px-3 focus:border-[rgba(0,0,0,0.5)] focus:outline-none'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                <Button className='!absolute !text-[rgba(0,0,0,0.6)] top-[50%] -translate-y-1/2 right-[10px] z-50 !rounded-full !w-[40px] !h-[40px] !min-w-[40px]'
                onClick={()=>setIsConfirmPasswordShow(!isConfirmPasswordShow)}
                >
                {
                    isConfirmPasswordShow ? <FaRegEye className='text-[18px]' /> : <FaEyeSlash className='text-[18px]' />
                }
                    

                </Button>
               </div>
               
            </div>
            <div className="form-group mb-4 w-full flex items-center justify-between">
                  <Link to='/login' className='text-secondary font-[700] text-[15px] hover:underline hover:text-gray-700' >
                  Login
                  </Link>
               


            </div>
            <Button className='!capitalize btn-blue md:btn-lg w-full '
            type='submit'
            >
                {
                    loading ? <CircularProgress size={30} />:'Reset Password'
                }
            </Button>
        </form>



    </div>



   </section>
  )
}

export default ResetPassword
