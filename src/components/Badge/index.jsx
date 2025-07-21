import React from 'react'

const Badge = ({status}) => {
  return (
    <span className={`inline-block  py-1 text-[11px] px-4 capitalize rounded-full
     ${status==='pending' && 'bg-primary text-white'}
     ${status==='confirm' && 'bg-green-500 text-white'}
     ${status==='delivered' && 'bg-green-700 text-white'}
     `
     }>{status}

    </span>
  ) 
}

export default Badge
