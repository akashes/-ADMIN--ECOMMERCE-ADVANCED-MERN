import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { MdOutlineLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

import OtpBox from '../../components/OtpBox'
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordOtp, verifyEmail } from '../../features/auth/authSlice';


const VerifyAccount = ({resetPassword}) => {
    const {loading}=useSelector(state=>state.auth)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
       const[otp,setOtp]=useState('');
       const[email,setEmail]=useState(location.state?.email);

    const handleOtpChange=(value)=>{
        setOtp(value)
    }

  const verifyOTP=async(e)=>{
        e.preventDefault();

        if(otp.length<6){
            showWarning('Please enter a valid OTP')
            return
        }
        if(!email){
            showWarning('Please enter a valid email address')
            return
        }
        if(resetPassword){
            //reset password logic
            const resultAction = await dispatch(forgotPasswordOtp({email,otp}))
            if(forgotPasswordOtp.fulfilled.match(resultAction)){
                showSuccess(resultAction.payload?.message)
                navigate('/reset-password')
            
            }
            if(forgotPasswordOtp.rejected.match(resultAction)){
                showError(resultAction.payload?.message || 'Failed to verify OTP')
            }



        }else{
            //make api call
            const resultAction = await dispatch(verifyEmail({email,otp}))
            console.log(resultAction)
            //error
            if(verifyEmail.rejected.match(resultAction)){
                showError(resultAction.payload)
            }
            if(verifyEmail.fulfilled.match(resultAction)){
                showSuccess(resultAction.payload || 'Verification successful')
                navigate('/login')
            
         
        localStorage.removeItem('verifyEmail')
       }


        }

       



    }

        useEffect(()=>{
        if(location.state?.message){
            showSuccess(location.state.message)
        }

    },[])

  return (
   <section className='  w-full  '>
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

    <div className="loginBox card w-full md:w-[600px] h-auto pb-25 mx-auto mt-20 relative z-50 ">
        <div className="text-center">

        <img src="/shield6.png" alt="" className='m-auto w-[100px] md:w-[200px]' />
        </div>
        {
            resetPassword ? (
                 <h1 className='text-center text-[30px] md:text-[35px]  font-[500] md:font-[800] mt-4'>Welcome Back! <br />
        <span className=''>Please enter your reset password OTP.</span>
        </h1>
            ):
            (

                  <h1 className='text-center text-[35px] font-[800] mt-4'>Welcome Back! <br />
        <span className='text-nowrap'>Please verify your Email.</span>
        </h1>
            )
        }
      
        <br />
        <p className=' text-center text-[15px]'>OTP send to <span className='text-secondary font-bold'>{email}</span></p>

        <br />
     
        <div className="">
                    {
                    !resetPassword &&  <div className='!w-full flex justify-center !mb-4'>

                 <TextField  id="outlined-basic" label="your email" variant="outlined" value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 />
                 </div>
                 }
            
           <OtpBox length={6} onChange={handleOtpChange} />
        </div>

        <br />
        <div className='w-[300px] mx-auto'>

        <Button disabled={loading} onClick={verifyOTP} className='btn-blue w-full'>{loading ? 'Verifying...':'verify OTP'}</Button>
        </div>

    



    </div>



   </section>
  )
}

export default VerifyAccount
