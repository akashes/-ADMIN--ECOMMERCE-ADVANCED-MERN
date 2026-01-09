import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MdOutlineLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const ChangePassword = () => {
const[isPasswordShow,setIsPasswordShow]=useState(false);
const[isConfirmPasswordShow,setIsConfirmPasswordShow]=useState(false);


  return (
   <section className='  w-full h-screen '>
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
<div className="fixed top-0 left-0 w-full h-full opacity-7 bg-[url('https://res.cloudinary.com/dllelmzim/image/upload/v1753140814/patern_z0bmzz.webp')] bg-repeat z-[-1]"></div>

<div className="flex items-center justify-center h-full w-full px-4 relative z-50">
       <div className='loginBox card w-[600px] h-auto pb-25'>
         <div className="text-center">

        <img src="https://ecommerce-admin-view.netlify.app/icon.svg" alt="" className='m-auto' />
        </div>
        <h1 className='text-center text-[35px] font-[800] mt-4'>Welcome Back! <br />
        <span className='text-nowrap'>You can change your password from here.</span>
        </h1>
       
        <br />
     

        <form className='w-full px-8 mt-3' >
           
            <div className="form-group mb-4 w-full">
                <h4 className='text-[14px] font-[500] mb-1'>New Password</h4>
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
            <div className="form-group mb-4 w-full">
                <h4 className='text-[14px] font-[500] mb-1'>Confirm Password</h4>
               <div className='relative w-full'>
                     <input type={isConfirmPasswordShow ? 'text' : 'password'} name="password" id=""
                className='w-full h-[45px] border-2 border-[rgba(0,0,0,0.2)] rounded-md  px-3 focus:border-[rgba(0,0,0,0.5)] focus:outline-none'
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
         
            <Button className='!capitalize btn-blue btn-lg w-full '>
                Change Password
            </Button>
        </form>


       </div>

    </div>



   </section>
  )
}

export default ChangePassword
