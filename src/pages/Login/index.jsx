import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { MdOutlineLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';
import {  loginUser, userLogin } from '../../features/auth/authSlice';



const Login = () => {
    const{loading}=useSelector(state=>state.auth)
const[isPasswordShow,setIsPasswordShow]=useState(false);
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');

const dispatch = useDispatch()
const navigate = useNavigate()
const [loadingGoogle, setLoadingGoogle] = useState(false);
  function handleClickGoogle() {
    setLoadingGoogle(true);
  }
  const navigateToForgot=()=>{
    navigate('/forgot-password',{state:{email}})
  }
  const handleLogin=async(e)=>{
    e.preventDefault()
    //input validation
    if(!email || !password){
        showWarning('Please fill all the fields')
        return
    }
    if(password.length<6){
        showWarning('Password must be at least 6 characters long')
        return
    }
    const resultAction = await dispatch(userLogin({email,password}))
    console.log(resultAction)
    if(userLogin.fulfilled.match(resultAction)){
        
        showSuccess(resultAction.payload.message ||'Login successful')
        navigate('/')
        await dispatch(loginUser({
            token: resultAction.payload.accessToken,
            user: resultAction.payload.user
        }))

  } 
  if(userLogin.rejected.match(resultAction)){
    showError(resultAction.payload.message ||'Login failed')
  }

  }
  const navigateToVerify=()=>{
    if(!email){
        showWarning('Please enter a valid email address')
        return
    }
      navigate('/verify',{
        replace:true,
        state:{
            email,
            message:"An OTP has been sent to your email address. Please verify to continue",
        }
    })
  }
   return (
   <section className='  w-full   '>
    <header className='w-full static  md:fixed top-0 left-0 z-100 px-4 py-3 flex items-center justify-center sm:justify-between'>
        <Link to='/'>
        <img src="https://serviceapi.spicezgold.com/download/1750047766437_logo.jpg" alt="" className='w-[200px]' />
        </Link>
        <div className="hidden sm:flex items-center   ">
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

    <div className="loginBox card  w-full md:w-[600px]  h-auto pb-10 mx-auto mt-5  lg:mt-20 relative z-50 ">
        <div className="text-center">

        <img src="https://ecommerce-admin-view.netlify.app/icon.svg" alt="" className='m-auto' />
        </div>
        <h1 className='text-center text-xl sm:text-3xl font-[800] mt-4'>Welcome Back! <br />
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
          className='!capitalize !bg-transparent !text-[rgba(0,0,0,0.7)] !text-[16px]   !px-5  !py-2'
        >
          Sign in with Google
        </Button>
        </div>
        <br />
        <div className='w-full flex items-center justify-center gap-3'>
            <span className='flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)] '></span>
            <span className='text-nowrap text-[10px]  sm:text-[15px] text-[rgba(0,0,0,0.9)] font-[500]'>Or, Sign in with your email</span>
            <span className='flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)] '></span>
        </div>
          <br />

        <form className='w-full px-8 mt-3' onSubmit={handleLogin} >
            <div className="form-group mb-4 w-full">
                <h4 className='text-[14px] font-[500] mb-1'>Email</h4>
                <input type="email" name="email" id="email"
                className='w-full h-12 sm:h-[45px] border-2 border-[rgba(0,0,0,0.2)] rounded-md  px-3 focus:border-[rgba(0,0,0,0.5)] focus:outline-none'
                autoFocus
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="form-group mb-4 w-full">
                <h4 className='text-[14px] font-[500] mb-1'>Password</h4>
               <div className='relative w-full'>
                     <input type={isPasswordShow ? 'text' : 'password'} name="password" id="password"
                className='w-full h-12 sm:h-[45px] border-2 border-[rgba(0,0,0,0.2)] rounded-md  px-3 focus:border-[rgba(0,0,0,0.5)] focus:outline-none'
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
            <div className="form-group mb-4 w-full flex items-center justify-between">
              <button type='button' className='text-gray-600 font-[700] text-[15px] hover:underline hover:text-gray-700'
              onClick={navigateToVerify}
              >Verify Email</button>
                  <p onClick={navigateToForgot} className='text-secondary font-[700] text-[15px] hover:underline hover:text-gray-700' >
                  Forgot Password
                  </p>


            </div>
            <div className="form-group mb-4 w-full flex items-center justify-between">
              <p type='button' className='text-[15px] text-[rgba(0,0,0,0.9)]'
              onClick={navigateToVerify}
              >Don't have an Account?</p>
                  <p onClick={()=>navigate('/sign-up')} className='text-secondary font-[700] text-[15px]' >
                  Sign Up
                  </p>


            </div>

            <Button className='!capitalize btn-blue btn-lg w-full '
            type='submit'
            >
                {
'Sign In'
                }
            </Button>
        </form>



    </div>



   </section>
  )
}

export default Login
