"use client"

import React, { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IoMdCloudUpload, IoMdEyeOff } from "react-icons/io"
import { IoEye, IoCheckmark } from "react-icons/io5"
import { CircularProgress } from "@mui/material"

import { MyContext } from "../../App"
import { showError, showSuccess, showWarning } from "../../utils/toastUtils"
import { updatePassword, updateUserDetails, uploadAvatar } from "../../features/auth/authSlice"
import { getAddress } from "../../features/user/userSlice"


 const PasswordInput = ({ label, value, onChange, show, setShow, disabled }) => (
  <div className="relative w-full">
    <input
      type={show ? "text" : "password"}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-sm"
    />
    <button
      type="button"
      onClick={() => setShow(!show)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
    >
      {show ? <IoEye size={18} /> : <IoMdEyeOff size={18} />}
    </button>
  </div>
)


const Profile = () => {
  const context = useContext(MyContext)
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { address } = useSelector((state) => state.user)
  console.log(address)

  const [loading, setLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  // --- Form States ---
  const [name, setName] = useState(user?.name || "")
  const [phone, setPhone] = useState(user?.mobile || "")
  const [avatar, setAvatar] = useState(user?.avatar?.url || "https://res.cloudinary.com/dllelmzim/image/upload/v1753808261/user_dhgqbt.png")

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [isChangePasswordFormShow, setIsChangePasswordFormShow] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const[preview,setPreview]=useState('')

// 1. Update the useEffect to be smarter
useEffect(() => {
  console.log('useeffect running')
  if (user?.avatar?.url) {
    console.log('url from redux')

    setAvatar(user.avatar.url);
    

    setPreview(null); 
  }
  if (user?.name) setName(user.name);
  if (user?.mobile) setPhone(user.mobile);
}, [user]);

const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (!validTypes.includes(file.type)) {
    showError("Please select a valid image file");
    return;
  }

  const previewUrl = URL.createObjectURL(file);
  setPreview(previewUrl); 

  setIsUploading(true);
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const resultAction = await dispatch(uploadAvatar(formData));
    
    if (uploadAvatar.fulfilled.match(resultAction)) {
      showSuccess("Avatar uploaded successfully");

    } else {
      showError(resultAction.payload || "Failed to upload avatar");
      setPreview(null); 
    }
  } catch (err) {
    setPreview(null);
  } finally {
    setIsUploading(false);
  }
};

useEffect(()=>{
  // if(localStorage.getItem('user')){
  //   alert('inside')
  //   const userData = JSON.parse(localStorage.getItem('user'))
  //   const userId = userData._id
  //   console.log('user id is ',userId)

  //   async function getAddressDetails(){
  //   if(userId){

  //     await dispatch(getAddress(userId))
  //   }
    
  // }
  //  getAddressDetails()

  // }
  if(user._id){
    dispatch(getAddress(user._id))
  }

  
  


},[])


  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    const hasChangedName = name !== user.name
    const hasChangedMobile = phone !== user.mobile

    if (!hasChangedName && !hasChangedMobile) {
      showWarning("Please change at least one field")
      return
    }

    setLoading(true)
    const resultAction = await dispatch(updateUserDetails({ name, mobile: phone }))
    if (updateUserDetails.fulfilled.match(resultAction)) {
      showSuccess(resultAction.payload.message || "Profile updated successfully")
    } else {
      showError(resultAction.payload?.message || "Failed to update profile")
    }
    setLoading(false)
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      console.log(newPassword)
      console.log(confirmPassword)
      showWarning("Passwords do not match")
      return
    }

    setPasswordLoading(true)
    const resultAction = await dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }))
    if (updatePassword.fulfilled.match(resultAction)) {
      showSuccess(resultAction.payload || "Password updated successfully")
      setOldPassword(""); setNewPassword(""); setConfirmPassword("")
    } else {
      showError(resultAction.payload || "Failed to update password")
    }
    setPasswordLoading(false)
  }

// const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
//     if (!validTypes.includes(file.type)) {
//       showError("Please select a valid image file");
//       return;
//     }

//     // 1. Create a local preview immediately
//     const previewUrl = URL.createObjectURL(file);
//     console.log(previewUrl)
//     setAvatar(previewUrl);

//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append("avatar", file);

//     const resultAction = await dispatch(uploadAvatar(formData));
    
//     if (uploadAvatar.fulfilled.match(resultAction)) {
//       showSuccess("Avatar uploaded successfully");
//     } else {
//       showError(resultAction.payload || "Failed to upload avatar");
//       // 2. Optional: Reset to old avatar if upload fails
//       if (user?.avatar?.url) {
//         setAvatar(user.avatar.url);
//       }
//     }
    
//     setIsUploading(false);
//   };



  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-900 mb-1">Profile Settings</h1>
        <p className="text-sm text-slate-500">Manage your account information and preferences</p>
      </div>

      {/* Avatar Section */}
      <div className="mb-10">
        <div className="relative inline-block">
          {/* <div className={`w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 ring-2 ring-slate-200 group transition-all ${isUploading ? "ring-slate-400" : ""}`}>
            <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="group-hover:opacity-100 transition-opacity absolute inset-0 opacity-0 bg-black/50 flex items-center justify-center cursor-pointer">
              <label className="cursor-pointer flex items-center justify-center">
                <IoMdCloudUpload className="text-white text-2xl" />
                <input type="file" className="hidden" onChange={handleImageChange} disabled={isUploading} />
              </label>
            </div>
          </div> */}
              <div className={` w-[80px] h-[80px]  md:w-[110px] md:h-[110px] rounded-full overflow-hidden mb-4 relative group ${isUploading ? ' animate-pulse' : 'ring-4 ring-gray-300'}`}>
                        <img src={preview|| avatar}  alt="avatar" className="w-full h-full object-cover" />

                        {/* Spinner Overlay when uploading */}
                        {isUploading && (
                            <div className="absolute top-0 left-0 w-full  h-full bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
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
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleUpdateProfile} className="space-y-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-sm disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-sm disabled:opacity-60"
            />
          </div>
          <div className="flex flex-col justify-end">
            {!user?.verify_email ? (
              <button type="button" className="px-4 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors text-sm">
                Verify Email
              </button>
            ) : (
              <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                <IoCheckmark className="text-green-600" size={18} />
                <span className="text-sm text-green-700 font-medium">Email verified</span>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-sm"
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Save Changes"}
        </button>
      </form>

      {/* Addresses Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Addresses</h2>
          <button
            type="button"
            onClick={() => context.setIsAddProductModalOpen({ open: true, modal: "Add New Address" })}
            className="text-sm font-medium text-slate-900 hover:text-slate-700 border border-slate-300 px-3 py-1 rounded-lg transition-colors"
          >
            + Add Address
          </button>
        </div>

        <div className="space-y-2">
          {address?.length > 0 ? (
            address.map((item) => (
              <label key={item._id} className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                <input type="radio" name="address" className="w-4 h-4" />
                <span className="text-sm text-slate-700">{item.address_line}</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-slate-500 py-4">No addresses added yet.</p>
          )}
        </div>
      </div>

      {/* Security Section */}
      <div className="border-t border-slate-200 pt-8">
        <button
          type="button"
          onClick={() => setIsChangePasswordFormShow((prev) => !prev)}
          className="w-full flex items-center justify-between mb-4"
        >
          <h2 className="text-lg font-semibold text-slate-900">Update Password</h2>
          <div className={`transition-transform duration-300 ${isChangePasswordFormShow ? "rotate-180" : ""}`}>
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </button>

        {isChangePasswordFormShow && (
          <form onSubmit={handlePasswordUpdate} className="space-y-4 pt-4">
            <PasswordInput label="Current Password" value={oldPassword} onChange={setOldPassword} show={showOldPassword} setShow={setShowOldPassword} />
            <PasswordInput label="New Password" value={newPassword} onChange={setNewPassword} show={showNewPassword} setShow={setShowNewPassword} />
            <PasswordInput label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} show={showConfirmPassword} setShow={setShowConfirmPassword} />

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-sm mt-6"
            >
              {passwordLoading ? <CircularProgress size={20} color="inherit" /> : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Profile