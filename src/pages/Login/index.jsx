import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MdOutlineLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const Login = () => {
const[isPasswordShow,setIsPasswordShow]=useState(false);

      const [loadingGoogle, setLoadingGoogle] = useState(false);
  function handleClickGoogle() {
    setLoadingGoogle(true);
  }
  return (
   <section className=' bg-[#fff] w-full  '>
    <header className='w-full fixed top-0 left-0 z-100 px-4 py-3 flex items-center justify-between'>
        <Link to='/'>
        <img src="https://serviceapi.spicezgold.com/download/1750047766437_logo.jpg" alt="" className='w-[200px]' />
        </Link>
        <div className="flex items-center ">
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
<div className="fixed top-0 left-0 w-full h-full opacity-10 bg-[url('https://res.cloudinary.com/dllelmzim/image/upload/v1753140814/patern_z0bmzz.webp')] bg-repeat"></div>

    <div className="loginBox card w-[600px] h-auto pb-25 mx-auto mt-20 relative z-50 ">
        <div className="text-center">

        <img src="https://ecommerce-admin-view.netlify.app/icon.svg" alt="" className='m-auto' />
        </div>
        <h1 className='text-center text-[35px] font-[800] mt-4'>Welcome Back! <br />
        <span className='text-nowrap'>Sign in with your credentials.</span>
        </h1>
        {/* google signin button */}
        <div className="flex items-center justify-center w-full mt-5">
             <Button
          size="small"
          onClick={handleClickGoogle}
          endIcon={<FcGoogle className='!text-[28px]' />}
          loading={loadingGoogle}
        //   loadingIndicator="Loading..."
          loadingPosition="end"
          variant="outlined"
          className='!capitalize !bg-none !text-[rgba(0,0,0,0.7)] !text-[16px]   !px-5  !py-2'
        >
          Sign in with Google
        </Button>
        </div>
        <br />
        <div className='w-full flex items-center justify-center gap-3'>
            <span className='flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)] '></span>
            <span className='text-nowrap text-[15px] text-[rgba(0,0,0,0.9)] font-[500]'>Or, Sign in with your email</span>
            <span className='flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)] '></span>
        </div>
          <br />

        <form className='w-full px-8 mt-3' >
            <div className="form-group mb-4 w-full">
                <h4 className='text-[14px] font-[500] mb-1'>Email</h4>
                <input type="email" name="email" id=""
                className='w-full h-[45px] border-2 border-[rgba(0,0,0,0.2)] rounded-md  px-3 focus:border-[rgba(0,0,0,0.5)] focus:outline-none'
                />
            </div>
            <div className="form-group mb-4 w-full">
                <h4 className='text-[14px] font-[500] mb-1'>Password</h4>
               <div className='relative w-full'>
                     <input type={isPasswordShow ? 'text' : 'password'} name="password" id=""
                className='w-full h-[45px] border-2 border-[rgba(0,0,0,0.2)] rounded-md  px-3 focus:border-[rgba(0,0,0,0.5)] focus:outline-none'
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
            <div className="form-group mb-4 w-full flex items-center justify-between">
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" className=' text-[rgba(0,0,0,0.9)]' />
                  <Link to='/forgot-password' className='text-secondary font-[700] text-[15px] hover:underline hover:text-gray-700' >
                  Forgot Password
                  </Link>


            </div>
            <Button className='!capitalize btn-blue btn-lg w-full '>
                Sign In
            </Button>
        </form>



    </div>



   </section>
  )
}

export default Login
