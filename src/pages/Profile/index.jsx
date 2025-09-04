import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoIosArrowDown, IoMdCloudUpload, IoMdEyeOff } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button';

import { FaUserCog } from "react-icons/fa";
import { BiSolidMap } from "react-icons/bi";
import { IoBagCheck, IoEye } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import axios from 'axios';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';
import { uploadImage } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, updateUserDetails, uploadAvatar } from '../../features/auth/authSlice';
import { CircularProgress, TextField } from '@mui/material';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Collapse from '@mui/material/Collapse';
import { MyContext } from '../../App';
import Checkbox from '@mui/material/Checkbox';
import { getAddress } from '../../features/user/userSlice';
import Radio from '@mui/material/Radio';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Profile = () => {
    const context = useContext(MyContext)
    const{user}=useSelector(state=>state.auth)
    const{address}=useSelector(state=>state.user)
    console.log(address)
  const[loading,setLoading]=useState(false)
  const[passwordLoading,setPasswordLoading]=useState(false)

  const[oldPassword,setOldPassword]=useState('')
  const[newPassword,setNewPassword]=useState('')
  const[confirmPassword,setConfirmPassword]=useState('')

 const[name,setName]=useState(user?.name || '')
 const[phone,setPhone]=useState('')

  const[isChangePasswordFormShow,setIsChangePasswordFormShow]=useState(false)
  const[showOldPassword,setShowOldPassword]=useState(false)
  const[showConfirmPassword,setShowConfirmPassword]=useState(false)
  const[showNewPassword,setShowNewPassword]=useState(false)

  // const[selectedAddressId,setSelectedAddressId]=useState('')

//   const isPasswordDisabled = !oldPassword || !newPassword || !confirmPassword;
  const updateUser=async(e)=>{
    e.preventDefault()


    const hasChangedName = name !== user.name;
const hasChangedMobile = phone !== user.mobile;
    //atleast one field should be filled
    if(!hasChangedName && !hasChangedMobile){
        showWarning('Please fill at least one field')
        return
    }
    if(phone.length>13 || phone.length<13){
        showWarning('Please enter a valid phone number')
        return
    }


    setLoading(true)
      const resultAction=  await dispatch(updateUserDetails({name,mobile:phone}))
      if(updateUserDetails.fulfilled.match(resultAction)){
        showSuccess(resultAction.payload.message || 'Profile updated successfully')
        setLoading(false)
        return
      }
      if(updateUserDetails.rejected.match(resultAction)){
        showError(resultAction.payload.message || 'Failed to update profile')
        setLoading(false)
        return
      }
  }
  const handlePasswordUpdate=async(e)=>{
    e.preventDefault()
    if(newPassword!==confirmPassword){
        showWarning('Passwords do not match')
        return
    }
    setPasswordLoading(true)
    const resultAction = await dispatch(updatePassword({oldPassword,newPassword,confirmPassword}))
    if(updatePassword.fulfilled.match(resultAction)){
        showSuccess(resultAction.payload || 'Password updated successfully')
        setPasswordLoading(false)
    }
    if(updatePassword.rejected.match(resultAction)){
        showError(resultAction.payload || 'Failed to update password')
        setPasswordLoading(false)

    }
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
    
    }

    // const handleSelectedAddressChange=async(e)=>{
    //   setSelectedAddressId(e.target.value)
    //   if(e.target.checked===true){
    //     dispatch(selectAddress({addressId:e.target.value,selected:true}))

    //   }else{
    //     dispatch(selectAddress({addressId:e.target.value,selected:false}))
    //   }

    // }


    const[avatar,setAvatar]=useState(user?.avatar?.url || 'https://res.cloudinary.com/dllelmzim/image/upload/v1753808261/user_dhgqbt.png')

    const [isUploading,setIsUploading]=useState(false)
    const dispatch = useDispatch()
    const handleImageChange=async(e)=>{
        const file=e.target.files[0]
        if(!file) return
        //checking image type
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

        if(!validTypes.includes(file.type)){ 
            showError('Please select a valid image file')
            return
        }
        setIsUploading(true)
        try {
             const formData = new FormData()
        formData.append('avatar',file)

        // const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/user/upload-avatar`,formData,{
        //     headers:{
        //         'Content-Type':'multipart/form-data'
        //     }
        // })
        console.log('calling with formdata',formData)
        const resultAction = await dispatch( uploadAvatar(formData))
        console.log(resultAction)
       if(uploadAvatar.fulfilled.match(resultAction)){
           showSuccess('Avatar uploaded successfully')
       }
       if(uploadAvatar.rejected.match(resultAction)){
           showError(resultAction.payload || 'Failed to upload avatar')
       }
            
        } catch (error) {
            console.log('upload error',error.response?.data || error.message)
            showError(error.response?.data?.message || error.message)
        }finally{
            setIsUploading(false)
        }
        
       
     
    }

    useEffect(() => {
  if (user?.avatar?.url) {
    setAvatar(user.avatar.url);
  }
  if(user?.name){
    setName(user.name)
  }
  if(user?.mobile){
    setPhone(user.mobile)
  }
}, [user]);

useEffect(()=>{
  if(localStorage.getItem('user')){
    const userData = JSON.parse(localStorage.getItem('user'))
    const userId = userData._id

    async function getAddressDetails(){
    if(userId){

      await dispatch(getAddress(userId))
    }
    
  }
   getAddressDetails()

  }

  


},[])
    
  return (
    <div className='w-[100%] md:w-[65%] '>
       <div className="card my-4  shadow-md sm:rounded-lg bg-white pt-5 px-3 md:px-5 pb-5">
           <div className="flex items-center justify-between">
               <h2 className='text-[18px] font-[600]'>Profile </h2>
                          <Button className="!text-gray-700 gap-1" onClick={()=>setIsChangePasswordFormShow(prev=>!prev)} >Change Password <IoIosArrowDown className={` transition-transform duration-300 ${isChangePasswordFormShow && 'rotate-180'}`} />  </Button>

           </div>
              <br />
                       <div className={` w-[70px] h-[70px]  md:w-[110px] md:h-[110px] rounded-full overflow-hidden mb-4 relative group ${isUploading ? 'ring-4 ring-primary animate-pulse' : 'ring-4 ring-gray-300'}`}>
                        <img src={avatar}  alt="avatar" className="w-full h-full object-cover" />

                        {/* Spinner Overlay when uploading */}
                        {isUploading && (
                            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}

                        {/* Upload Overlay */}
                        <div className="group-hover:opacity-100 transition-all absolute opacity-0 overlay w-full h-full top-0 left-0 z-40 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
                            <IoMdCloudUpload className="text-white text-[25px]" />
                            <input
                            type="file"
                            className="absolute top-0 left-0 w-full h-full opacity-0"
                            onChange={handleImageChange}
                            disabled={isUploading}
                            />
                        </div>
                      </div>
                            <form className="mt-5" onSubmit={updateUser} >
              <div className="flex items-center gap-5 ">
                <div className="w-[50%]">
                  <TextField
                  sx={{
                        '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'gray', 
                        },
                        },
       

                    }}
                  
                    className="w-full"
                    variant="outlined"
                    label="Full Name"
                    size="small"
                    disabled={loading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    className="w-full bg-[#f1f1f1] pointer-events-none"
                    variant="outlined"
                    size="small"
                    type="email"
                    disabled={true}
                    value={user?.email}
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 mt-4 ">
                <div className="w-[50%]">
                  {/* <TextField
                    className="w-full"
                    label="Phone No"
                    type="number"
                    variant="outlined"
                    size="small"
                    disabled={loading}
                    value={formFields.phone}
                    onChange={(e) => setFormFields({...formFields,phone:e.target.value})}
                  /> */}
                  <PhoneInput
        defaultCountry="in"
        value={phone}
        onChange={(phone) => setPhone(phone)}
      />
                </div>
                {
               !user?.verify_email ?
                     <div className="w-[50%]">
                  <Button className="!bg-black !text-white ">Verify Email</Button>
                </div>:
                <div className="flex  items-center gap-1 ">
                    <img className="w-[20px]  align-middle" src="https://res.cloudinary.com/dllelmzim/image/upload/v1753885099/check_fl8d2v.png" alt="" />
                    <p className="!m-0">email verified</p>
                </div>
                }
               
              </div>
              <br />
              <hr className='py-3 text-gray-400' />
              {/* address section */}
              <div onClick={()=>context.setIsAddProductModalOpen({
                open:true,
                modal:'Add New Address'
              })} className="flex items-center justify-center p-3  md:p-5 rounded-md border  border-dashed border-[rgba(0,0,0,0.3)] bg-[#f1faff] cursor-pointer hover:bg-[#e5f5ff]">
                <span className='text-[14px] font-[500]'>Add Address</span>
              </div>
              <div className="flex gap-2 flex-col mt-4 ">

              {
                address?.length>0 && address.map((address)=>(
                    <label className="addressBox w-full bg-[#f1f1f1]  p-1 md:p-3 rounded-md cursor-pointer flex items-center justify-center
                    border  border-dashed border-[rgba(0,0,0,0.3)]
                    ">
                <Radio name='address' size='small'
                // value={address._id} checked={address._id===selectedAddressId} onChange={handleSelectedAddressChange}
                 />
                      <span className='text-[12px] '>{address.address_line}</span>
                
                </label> 

                ))
              }
              </div>

            
              <br />

              <div className="flex items-center gap-4">
                <Button
                type='submit'
                  className={`w-full px-4 py-2 rounded  font-semibold 
                   btn-blue md:btn-lg  hover:bg-gradient-to-tr hover:from-[#535353] hover:to-[#030202] hover:!text-white bg-gradient-to-tr from-[#33aaff] to-[var(--secondary)] ${loading && 'pointer-events-none opacity-80'}`}
                   type="submit"
                   disabled={loading}
                
                >
                    {
                        loading ? 'Updating...': 'Update profile'
                    }
                </Button>
            
              </div>
                         </form>


                

        </div>
        
          <Collapse className='' in={isChangePasswordFormShow}>
             <div className="card bg-white p-2  md:p-5 shadow-md rounded-md relative">
            <div className="flex items-center justify-between pb-2 pt-2">

            <h2 className="text-[17px] font-[500]">Change Password</h2>
            </div>
            <hr className="text-gray-400" />
              <form className="mt-5 !py-3">
              <div className="flex flex-col md:flex-row gap-2 ">
                
                <div className="md:w-[50%]">
                        <div className="form-group w-full  relative">

                <TextField   sx={{
                        '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'gray', 
                        },
                        },
       

                    }}  size='small' className='w-full input-ele '  id="password" label="old Password" variant="outlined" name='old password' 
                type={showOldPassword?'text':'password'}
                value={oldPassword}
                onChange={(e)=>setOldPassword(e.target.value)}
                />
                    <Button type='button' className='!absolute right-3 top-[50%] -translate-y-[50%] !text-black !w-[35px] !min-w-[35px] !rounded-full opacity-75'
                    onClick={()=>setShowOldPassword(!showOldPassword)}
                    >
                        {
                            showOldPassword ?
                            (
                             <IoEye className=' text-[20px]' />

                            )
                            :
                            (
                            <IoMdEyeOff className=' text-[20px]' />

                            )
                        }

                    </Button>
                  
                    
                    
                    </div>

       
                </div>
                <div className="md:w-[50%]">
                    <div className="form-group w-full  relative">

                <TextField   sx={{
                        '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'gray', 
                        },
                        },
       

                    }}  size='small' className='w-full input-ele '  id="password" label="New Password" variant="outlined" name='old password' 
                type={showNewPassword?'text':'password'}
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                />
                    <Button type='button' className='!absolute right-3 top-[50%] -translate-y-[50%] !text-black !w-[35px] !min-w-[35px] !rounded-full opacity-75'
                    onClick={()=>setShowNewPassword(!showNewPassword)}
                    >
                        {
                            showNewPassword ?
                            (
                             <IoEye className=' text-[20px]' />

                            )
                            :
                            (
                            <IoMdEyeOff className=' text-[20px]' />

                            )
                        }

                    </Button>
                  
                    
                    
                    </div>
                </div>
              </div>
              <div className="flex items-center gap-5 mt-4 ">
                <div className="w-full md:w-[50%]">
                    <div className="form-group w-full  relative">

                <TextField   sx={{
                        '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'gray', 
                        },
                        },
       

                    }} size='small' className='w-full input-ele '  id="password" label="confirm Password" variant="outlined" name='old password' 
                type={showConfirmPassword?'text':'password'}
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                    <Button type='button' className='!absolute right-3 top-[50%] -translate-y-[50%] !text-black !w-[35px] !min-w-[35px] !rounded-full opacity-75'
                    onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {
                            showConfirmPassword ?
                            (
                             <IoEye className=' text-[20px]' />

                            )
                            :
                            (
                            <IoMdEyeOff className=' text-[20px]' />

                            )
                        }

                    </Button>
                  
                    
                    
                    </div>
                </div>
           
               
              </div>
              <br />

              <div className="flex items-center gap-4">
                <Button
                  className={ ` w-full md:w-[200px] px-4 py-2 rounded  font-semibold 
                  !mx-auto !text-white  md:btn-lg  hover:bg-gradient-to-tr hover:from-[#535353] hover:to-[#030202]  bg-gradient-to-tr from-[#33aaff] to-[var(--secondary)] hover:!text-white ${passwordLoading   && 'pointer-events-none opacity-60'}`}
                   type="submit"
                   disabled={passwordLoading }
                   onClick={handlePasswordUpdate}
                >
                    {
                        passwordLoading ?  <CircularProgress size={30} className="text-white"/>  :   ' Update Password'

                    }
                </Button>
            
              </div>
            </form>
            </div>
             </Collapse>
</div>
  )
}

export default Profile
