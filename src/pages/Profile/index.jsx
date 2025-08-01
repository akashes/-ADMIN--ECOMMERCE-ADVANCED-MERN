import React, { useContext, useEffect, useState } from 'react'
import { IoIosArrowDown, IoMdCloudUpload } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button';

import { FaUserCog } from "react-icons/fa";
import { BiSolidMap } from "react-icons/bi";
import { IoBagCheck } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import axios from 'axios';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';
import { uploadImage } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails, uploadAvatar } from '../../features/auth/authSlice';
import { CircularProgress, TextField } from '@mui/material';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';


const Profile = () => {
    const{user}=useSelector(state=>state.auth)
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

  const isPasswordDisabled = !oldPassword || !newPassword || !confirmPassword;
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
//    const result = await putData('/api/user/update-password',{oldPassword,newPassword,confirmPassword})
   console.log(result)
   setPasswordLoading(false)
   if(!result.success){
    showWarning(result.message || 'Something went wrong')
    return
   }
   showSuccess(result.message || 'Password updated successfully')
   setOldPassword('')
   setNewPassword('')
   setConfirmPassword('')
  
  }



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
    
  return (
       <div className="card my-4 w-[65%] shadow-md sm:rounded-lg bg-white pt-5 px-5 pb-5">
           <div className="flex items-center justify-between">
               <h2 className='text-[18px] font-[600]'>Users List </h2>
                          <Button className="!text-gray-700 gap-1" onClick={()=>setIsChangePasswordFormShow(prev=>!prev)} >Change Password <IoIosArrowDown className={` transition-transform duration-300 ${isChangePasswordFormShow && 'rotate-180'}`} />  </Button>

           </div>
              <br />
                       <div className={`w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group ${isUploading ? 'ring-4 ring-primary animate-pulse' : 'ring-4 ring-gray-300'}`}>
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

              <div className="flex items-center gap-4">
                <Button
                type='submit'
                  className={`w-full px-4 py-2 rounded  font-semibold 
                   btn-blue btn-lg  hover:bg-gradient-to-tr hover:from-[#535353] hover:to-[#030202] hover:!text-white ${loading && 'pointer-events-none opacity-80'}`}
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
  )
}

export default Profile
