import { Skeleton } from '@mui/material';
import React from 'react'

const OrderSkelton = () => {

   return [...Array(5)].map((_, index) => (
    <tr key={index} className="bg-white border-b">
      <td className="px-6 py-4">
        <Skeleton variant="circular" width={35} height={35} />
      </td>
      <td className="px-6 py-4">
        <Skeleton variant="text" width={120} />
      </td>
      <td className="px-6 py-4">
        <Skeleton variant="text" width={150} />
      </td>
      <td className="px-6 py-4">
        <Skeleton variant="text" width={100} />
      </td>
      <td className="px-6 py-4">
        <Skeleton variant="text" width={100} />
      </td>
      <td className="px-6 py-4">
        <Skeleton variant="text" width={250} />
      </td>
      <td className="px-6 py-4">
        <Skeleton variant="text" width={80} />
      </td>
      <td className="px-6 py-4">
        <Skeleton variant="text" width={100} />
      </td>
      <td className="px-6 py-4">
        <Skeleton variant="text" width={120} />
      </td>
      <td className="px-6 py-4">
        <Skeleton variant="text" width={150} />
      </td>
      <td className="px-6 py-4">
        <Skeleton variant="rectangular" width={100} height={30} />
      </td>
    </tr>
  ));
  
}

export default OrderSkelton
