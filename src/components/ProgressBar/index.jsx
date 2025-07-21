import React from 'react'

const ProgressBar = ({value,type}) => {
  return (
    <div className='w-[100px] h-auto overflow-hidden rounded-md bg-[#f1f1f1]'>
        <span className={`flex items-center w-[${value}%] h-[8px] 
         ${type==='success'&&'bg-green-600'}
         ${type==='error'&&'bg-pink-600'}
         ${type==='warning'&&'bg-orange-400'}
         `}></span>
      
    </div>
  )
}

export default ProgressBar
