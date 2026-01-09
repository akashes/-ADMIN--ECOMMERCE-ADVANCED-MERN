"use client"

import { useEffect, useState } from "react"
import { IoMdCloudUpload, IoMdEyeOff } from "react-icons/io"
import { IoEye, IoCheckmark } from "react-icons/io5"

const UserProfile = ({
  user = {},
  addresses = [],
  onUpdateProfile,
  onUpdatePassword,
  onUploadAvatar,
  onAddAddress,
  loading = false,
  passwordLoading = false,
}) => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState(user?.name || "")
  const [phone, setPhone] = useState(user?.mobile || "")
  const [isChangePasswordFormShow, setIsChangePasswordFormShow] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [avatar, setAvatar] = useState(
    user?.avatar?.url || "https://res.cloudinary.com/dllelmzim/image/upload/v1753808261/user_dhgqbt.png",
  )
  const [isUploading, setIsUploading] = useState(false)

  const updateUser = async (e) => {
    e.preventDefault()
    if (onUpdateProfile) {
      try {
        await onUpdateProfile({ name, mobile: phone })
      } catch (error) {
        console.error("Update profile error:", error)
      }
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    if (onUpdatePassword) {
      try {
        await onUpdatePassword({ oldPassword, newPassword, confirmPassword })
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } catch (error) {
        console.error("Update password error:", error)
      }
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
    if (!validTypes.includes(file.type)) {
      alert("Please select a valid image file")
      return
    }

    if (onUploadAvatar) {
      setIsUploading(true)
      try {
        await onUploadAvatar(file)
      } catch (error) {
        console.error("Upload avatar error:", error)
      } finally {
        setIsUploading(false)
      }
    }
  }

  useEffect(() => {
    if (user?.avatar?.url) {
      setAvatar(user.avatar.url)
    }
    if (user?.name) {
      setName(user.name)
    }
    if (user?.mobile) {
      setPhone(user.mobile)
    }
  }, [user])

  const PasswordInput = ({
    label,
    value,
    onChange,
    show,
    setShow,
  }) => (
    <div className="relative w-full">
      <input
        type={show ? "text" : "password"}
        placeholder={label}
        value={value}
        onChange={onChange}
        disabled={passwordLoading}
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

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-900 mb-1">Profile </h1>
        <p className="text-sm text-slate-500">Manage your account information and preferences</p>
      </div>

      {/* Avatar  */}
      <div className="mb-10">
        <div className="relative inline-block">
          <div
            className={`w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 ring-2 ring-slate-200 group transition-all ${isUploading ? "ring-slate-400" : ""}`}
          >
            <img src={avatar || "/placeholder.svg"} alt="avatar" className="w-full h-full object-cover" />

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
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={updateUser} className="space-y-8 mb-8">
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
              <button
                type="button"
                className="px-4 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors text-sm"
              >
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

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-sm"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Addresses Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Addresses</h2>
          <button
            type="button"
            onClick={onAddAddress}
            className="text-sm font-medium text-slate-900 hover:text-slate-700 border border-slate-300 px-3 py-1 rounded-lg transition-colors"
          >
            + Add Address
          </button>
        </div>

        <div className="space-y-2">
          {addresses?.length > 0 ? (
            addresses.map((addr) => (
              <label
                key={addr._id}
                className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <input type="radio" name="address" className="w-4 h-4" />
                <span className="text-sm text-slate-700">{addr.address_line}</span>
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
          <h2 className="text-lg font-semibold text-slate-900">Security</h2>
          <div className={`transition-transform duration-300 ${isChangePasswordFormShow ? "rotate-180" : ""}`}>
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </button>

        {isChangePasswordFormShow && (
          <form onSubmit={handlePasswordUpdate} className="space-y-4 pt-4">
            <PasswordInput
              label="Current Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              show={showOldPassword}
              setShow={setShowOldPassword}
            />
            <PasswordInput
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              show={showNewPassword}
              setShow={setShowNewPassword}
            />
            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              show={showConfirmPassword}
              setShow={setShowConfirmPassword}
            />

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-sm mt-6"
            >
              {passwordLoading ? "Updating Password..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default UserProfile