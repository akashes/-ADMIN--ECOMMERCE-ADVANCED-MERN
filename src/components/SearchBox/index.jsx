import React from 'react'
import { IoMdSearch } from "react-icons/io";


const SearchBox = () => {
  return (
    <div className='w-full h-auto   relative overflow-hidden'>
        <IoMdSearch className='absolute top-[50%] -translate-y-[50%] left-[10px] text-[18px] pointer-events-none opacity-80'/>
        <input type="text" className='w-full pl-8 border-1 border-[rgba(0,0,0,0.1)] rounded-md h-[40px] bg-[#f1f1f1]
         p-2 focus:outline-none focus:border-[rgba(0,0,0,0.5)] text-[13px]'
         placeholder='Search here...'
         />
      
    </div>
  )
}

export default SearchBox
