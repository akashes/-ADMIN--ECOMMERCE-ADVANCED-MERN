import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import  Button  from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { approveCancelRequest, getOrders, markAsPaid, markAsRefunded, updateOrderStatus } from '../../features/order/orderSlice'
import {  MenuItem, Pagination, Select } from '@mui/material'
import { showError, showSuccess } from '../../utils/toastUtils'
import OrderSkelton from '../../components/Skeltons/OrderSkelton'

import SearchBox from '../../components/SearchBox'
import useDebounce from '../../hooks/useDebounce'
import { Chip } from "@mui/material";


import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { exportToExcel, exportToPDF } from '../../utils/exportOrder'

const STATUS_FLOW = ["pending", "confirmed", "shipped", "on-the-way", "delivered"];



const getStatusChip = (status) => {
  const colorMap = {
    pending: { label: "Pending", color: "warning" },
    confirmed: { label: "Confirmed", color: "info" },
    shipped: { label: "Shipped", color: "primary" },
    "on-the-way": { label: "On the Way", color: "secondary" },
    delivered: { label: "Delivered", color: "success" },
    cancelled: { label: "Cancelled", color: "error" },
    'cancel-requested':{label:'Cancel Requested',color:'green'}
  };

  const { label, color } = colorMap[status] || { label: status, color: "default" };
  return <Chip label={label} color={color} size="small" className="font-bold" />;
};

const Orders = () => {

  
      const[searchTerm,setSearchTerm]=useState('')
      const debouncedSearchTerm = useDebounce(searchTerm,500)
  


   const dispatch = useDispatch()
  const{orders,pagination,loading,orderStatusLoading}=useSelector(state=>state.order)
  const[page,setPage]=useState(1)
  const limit =10


  const [filters, setFilters] = useState({
  payment_method: "",
  payment_status: "",
  order_status: "",
  search: "",
  dateRange:""
});

        const[showProducts,setShowProducts]=useState(null)
      const isShowOrderedProduct=(index)=>{
        if(showProducts===index){
          return setShowProducts(null)
    
    
        }
        setShowProducts(index)
      
    
      }
  


// function validateOrderTransition(currentOrder, newOrderStatus, newPaymentStatus) {
//   const { orderStatus, paymentStatus, paymentMethod } = currentOrder;

//   // Prevent illogical downgrades
//   if (paymentMethod === "online") {
//     if (orderStatus === "Confirmed" && newOrderStatus === "Pending") {
//       throw new Error("Online payment orders cannot go back to Pending.");
//     }
//   }

//   // Shipped requires payment
//   if (newOrderStatus === "Shipped" && paymentStatus !== "Paid") {
//     throw new Error("Order cannot be shipped until payment is completed.");
//   }

//   // Delivered requires shipped first
//   if (newOrderStatus === "Delivered" && orderStatus !== "Shipped") {
//     throw new Error("Order must be Shipped before marking as Delivered.");
//   }

//   // Cancel + Paid → refund
//   if (newOrderStatus === "Cancelled" && paymentStatus === "Paid") {
//     if (!newPaymentStatus || newPaymentStatus !== "Refunded") {
//       throw new Error("Paid orders must be marked Refunded when cancelled.");
//     }
//   }

//   // COD: Delivered → Paid
//   if (paymentMethod === "COD" && newOrderStatus === "Delivered") {
//     if (newPaymentStatus !== "Paid") {
//       throw new Error("COD orders must be marked Paid when Delivered.");
//     }
//   }
//    if (paymentMethod !== "COD" && next === "Pending") {
//     throw new Error("Paid orders cannot go back to Pending");
//   }
//   if (current === "Delivered" || current === "Cancelled") {
//     throw new Error("Finalized orders cannot be changed");
//   }

//   return true; // ✅ valid transition
// }

async function validateOrderTransition(order,status){
   if(order.payment_status==='pending' && status === 'delivered'){
    showError('Cannot set Order Status to Delivered while payment is Pending')
    return 
          
        }

  const resultAction = await dispatch(updateOrderStatus({orderId:order._id,status}))

        if(updateOrderStatus.fulfilled.match(resultAction)){
          showSuccess('order status updated successfully')

        }
        if(updateOrderStatus.rejected.match(resultAction)){
          showError('Failed to update order status')
        }
  


}

  const handleSearchChange = (e) => {
    console.log('inside handlesearch chagne')
    setSearchTerm(e.target.value);
  };

      // useEffect(()=>{
      //   dispatch(getOrders())

      // },[])

      useEffect(()=>{
        dispatch(getOrders({page,limit,...filters}))

      },[dispatch,page,filters])

      useEffect(()=>{

        setPage(1)
      },[filters])

useEffect(() => {
  setFilters(prev => ({ ...prev, search: debouncedSearchTerm }))
}, [debouncedSearchTerm])

const handleMarkAsRead=async(id)=>{
  const resultAction = await  dispatch(markAsPaid(id))
  console.log(resultAction)
         if(markAsPaid.fulfilled.match(resultAction)){
          showSuccess('Marked as Paid')
          // dispatch(getOrders())
         }
         if(markAsPaid.rejected.match(resultAction)){
          showError(resultAction.payload)
         }
  

}

const handleApproveCancel = async (id) => {
  const resultAction = await dispatch(approveCancelRequest(id));
  if (approveCancelRequest.fulfilled.match(resultAction)) {
    showSuccess("Order cancelled successfully");
  } else {
    showError("Failed to cancel order");
  }
};

const handleApproveRefund = async (id) => {
  const resultAction = await dispatch(markAsRefunded(id));
  if (markAsRefunded.fulfilled.match(resultAction)) {
    showSuccess("Refund approved successfully");
  } else {
    showError("Failed to approve refund");
  }
};


// const handleMarkAsRefunded=async(id)=>{
//   const resultAction = await  dispatch(markAsRefunded(id))
//          if(markAsRefunded.fulfilled.match(resultAction)){
//           showSuccess('Refunded Successfully')
//           // dispatch(getOrders())
//          }
//          if(markAsPaid.rejected.match(resultAction)){
//           showError('Failed to Initiate Refund')
//          }
  

// }

  return (
      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
    <h1 className='mx-auto font-[500] text-[22px] md:text-[25px] !p-3'>Orders</h1>
    {/* filters */}
  <div className="flex flex-wrap gap-2 md:gap-3 items-end px-3 py-5">
  {/* Payment Method */}
  <div className="w-full sm:w-[48%] md:w-[23%]">
    <h4 className="font-[600] text-[13px] mb-0 md:mb-2">Payment Method</h4>
    <Select
      fullWidth
      size="small"
      value={filters.payment_method}
      onChange={(e) =>
        setFilters({ ...filters, payment_method: e.target.value })
      }
    >
      <MenuItem value="cod">CASH ON DELIVERY</MenuItem>
      <MenuItem value="razorpay">RAZORPAY</MenuItem>
      <MenuItem value="paypal">PAYPAL</MenuItem>
    </Select>
  </div>

  {/* Payment Status */}
  <div className="w-full sm:w-[48%] md:w-[23%]">
    <h4 className="font-[600] text-[13px] mb-0 md:mb-2">Payment Status</h4>
    <Select
      fullWidth
      size="small"
      value={filters.payment_status}
      onChange={(e) =>
        setFilters({ ...filters, payment_status: e.target.value })
      }
    >
      <MenuItem value="paid">PAID</MenuItem>
      <MenuItem value="pending">PENDING</MenuItem>
    </Select>
  </div>

  {/* Order Status */}
  <div className="w-full sm:w-[48%] md:w-[23%]">
    <h4 className="font-[600] text-[13px] mb-0 md:mb-2">Order Status</h4>
    <Select
      fullWidth
      size="small"
      value={filters.order_status}
      onChange={(e) =>{
       

        setFilters({ ...filters, order_status: e.target.value })
      }
      }
    >
      <MenuItem value="pending">PENDING</MenuItem>
      <MenuItem value="confirmed">CONFIRMED</MenuItem>
      <MenuItem value="shipped">SHIPPED</MenuItem>
      <MenuItem value="on-the-way">ON THE WAY</MenuItem>
      <MenuItem value="delivered">DELIVERED</MenuItem>
    </Select>
  </div>
  {/* Date Range */}
<div className="w-full sm:w-[48%] md:w-[23%]">
  <h4 className="font-[600] text-[13px]  mb-0 md:mb-2">Date Range</h4>
  <Select
    fullWidth
    size="small"
    value={filters.dateRange}
    onChange={(e) =>
      setFilters({ ...filters, dateRange: e.target.value })
    }
  >
    <MenuItem value="">ALL</MenuItem>
    <MenuItem value="today">Today</MenuItem>
    <MenuItem value="lastweek">Last 7 Days</MenuItem>
    <MenuItem value="lastmonth">Last 30 Days</MenuItem>
    <MenuItem value="thisyear">This Year</MenuItem>
  </Select>
</div>


</div>

<div className="flex flex-col-reverse sm:flex-row gap-5 justify-between md:gap-0  ml-auto px-3 py-2">
  <div className='flex gap-3'>

  <Button className='flex gap-1 items-center !py-1 !px-1 md:!px-2' variant="outlined" color="primary" size="small" onClick={()=>exportToExcel(orders)}>
    <img className='w-[21px] md:w-[25px]' src="https://res.cloudinary.com/dllelmzim/image/upload/v1757935506/excel_hlj1y5.png" alt="" />
    Export Excel
  </Button>
  <Button className='flex gap-1 items-center !py-1 !px-1  md:!px-2' variant="outlined" color="secondary" size="small" onClick={()=>exportToPDF(orders)}>
    <img className='w-[21px] md:w-[25px]' src="https://res.cloudinary.com/dllelmzim/image/upload/v1757935506/pdf_1_fdwps0.png" alt="" />
    Export PDF
  </Button>
  </div>
    {/* Search + Clear */}
  <div className="w-full sm:w-[48%] md:w-[30%] flex gap-3 ">
    <SearchBox value={searchTerm} onChange={handleSearchChange} placeholder={'name/email/userId/PaymentId/Payment-Method'} />
    <Button
      onClick={() => {
    setFilters({ payment_method: "", payment_status: "", order_status: "", search: "" });
    setSearchTerm("");
  }}
      className="!min-w-[120px]"
      variant="outlined"
      color="error"
      size="small"
    >
      Clear Filters
    </Button>
  </div>
</div>

     <div className="relative overflow-x-auto mt-5 pb-5">
       <table className="w-full text-sm text-left text-gray-500  rtl:text-right">
            {/* order related heading */}
              <thead className="text-xs text-gray-700 bg-gray-50  ">
                <tr>
                  <th scope="col" className="py-1 px-3 md:py-3 md:px-6">
                    &nbsp;

                  </th>
                  <th scope="col" className="py-1 px-3 md:py-3 md:px-6 whitespace-nowrap">
                    Order Id 

                  </th>
                    <th scope="col" className="py-1 px-3 md:py-3 md:px-6 whitespace-nowrap">
                    payment method

                  </th>
                  <th scope="col" className="py-1 px-3 md:py-3 md:px-6 whitespace-nowrap">
                    Payment status

                  </th>
                  <th scope="col" className="py-1 px-3 md:py-3 md:px-6 whitespace-nowrap">
                    Order Status

                  </th>
                  <th scope="col" className="py-1 px-3 md:py-3 md:px-6 whitespace-nowrap">
                    Update Order

                  </th>
                  <th scope="col" className="py-1 px-3 md:py-3 md:px-6">
                    Date

                  </th>
                             <th scope="col" className="py-1 px-3 md:py-3 md:px-6">
                    Name

                  </th>
                  <th scope="col" className="py-1 px-3 md:py-3 md:px-6 whitespace-nowrap hidden md:table-cell ">
                    Phone No.

                  </th>
                  <th scope="col" className="py-1 px-3 md:py-3 md:px-6">
                    Address

                  </th>
               
                  <th scope="col" className="py-1 px-3 md:py-3 md:px-6 whitespace-nowrap">
                    Total Amount

                  </th>
                  <th scope="col" className="py-1 px-3 md:py-3 md:px-6">
                    Email

                  </th>
                  <th scope="col" className="py-1 px-3 md:py-3 md:px-6 whitespace-nowrap hidden md:table-cell">
                    Payment Id

                  </th>
       
                  <th scope="col" className="py-1 px-3 md:py-3 md:px-6 whitespace-nowrap">
                    User Id

                  </th>
                
                </tr>
              </thead>

              {/* order related table body */}
              <tbody>
                {
                  loading ? <OrderSkelton/>:
                  orders?.length>0 && orders.map((order,index)=>{
                    let disableOrderStatus = order.order_status==='delivered'
                    let isOrderStatusLoading = order._id == orderStatusLoading
                    console.log(order)
                    return(
                      <React.Fragment key={order._id}>
                                      <tr className={`bg-white border-b border-b-[rgba(0,0,0,0.2)] ${isOrderStatusLoading && 'uploading-gradient-delete'} ${order.order_status==='cancelled' && 'opacity-60'}`}>
                  <td className="px-6 py-4 font-[500]">
                      <Button  className="  !w-[25px] !h-[25px] !min-w-[25px] md:!w-[35px] md:!h-[35px] md:!min-w-[35px] !rounded-full !bg-[#cfcdcd] !text-black"
                    onClick={()=>isShowOrderedProduct(index)}
                    >
                      {
                        showProducts ===index ? <FaAngleDown className="text-[16px] rotate-180 text-gray-700 "/>: <FaAngleDown className="text-[16px] text-gray-700 "/> 
                      }
                    </Button>

                  </td>
                  
                  <td className="px-2 md:px-2 py-1 md:py-4 font-[500] text-gray-600">
                    {order._id}
                  </td>
                     <td className="px-2 md:px-3 py-1 md:py-3 font-[500] text-center">
                    <span className="font-bold">


                  {
  order.payment_method === 'cod'
    ? 'COD'
    : order.payment_method === 'razorpay'
    ? 'RAZORPAY'
    : order.payment_method === 'paypal'
    ? 'PAYPAL'
    : ''
}

                    </span>
{order.payment_method === "cod" 
  && order.payment_status === "pending" 
  && order.order_status !== "cancelled"
  && order.order_status !== "cancel-requested" && (
    <Button
      variant="outlined"
      size="small"
      color="warning"
      onClick={() => handleMarkAsRead(order._id)}
    >
      Mark as Paid
    </Button>
)}

{order.order_status === "cancel-requested" && order.payment_status === "pending" && (
  <Button
    variant="outlined"
    size="small"
    color="error"
    onClick={() => handleApproveCancel(order._id)}
  >
    Approve Cancel
  </Button>
)}

{order.order_status === "cancel-requested" && order.payment_status === "paid" && (
  <Button
    variant="outlined"
    size="small"
    color="error"
    onClick={() => handleApproveRefund(order._id)}
  >
    Approve Cancel + Refund
  </Button>
)}
{/* {
  order.order_status==='cancelled' && order.order_status !=='refunded' && <Button

    variant="outlined"
    size="small"
    color="warning"
    onClick={()=>handleMarkAsRefunded(order._id) }
  >
    Refund Order
  </Button>
} */}

                  </td>
                  <td className="px-2 md:px-3 py-1 md:py-3 font-[500] text-center">
                    <span className={ `uppercase font-bold ${order.payment_status==='pending'&& 'text-primary'} ${order.payment_status==='paid' && 'text-green-600'} `}>


                   {order.payment_status}
                    </span>

                  </td>


<td className="px-2  flex items-center justify-center py-3 md:py-5  ">
  {getStatusChip(order.order_status)}
</td>


                  <td className="px-2 md:px-3 py-1 md:py-3 font-[500]">
  <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={order?.order_status}
          label="Age"
          onChange={(e)=>validateOrderTransition(order,e.target.value)}
          size='small'
          style={{zoom:'80%'}}
          className='w-full'
          disabled={disableOrderStatus || order.order_status==='cancelled'}
      
        >
<MenuItem 
  disabled={STATUS_FLOW.indexOf("pending") < STATUS_FLOW.indexOf(order.order_status) || order.payment_method !== 'cod'} 
  value="pending"
>
  Pending
</MenuItem>

<MenuItem 
  disabled={STATUS_FLOW.indexOf("confirmed") < STATUS_FLOW.indexOf(order.order_status)} 
  value="confirmed"
>
  Confirmed
</MenuItem>

<MenuItem 
  disabled={STATUS_FLOW.indexOf("shipped") < STATUS_FLOW.indexOf(order.order_status)} 
  value="shipped"
>
  Shipped
</MenuItem>

<MenuItem 
  disabled={STATUS_FLOW.indexOf("on-the-way") < STATUS_FLOW.indexOf(order.order_status)} 
  value="on-the-way"
>
  On the Way
</MenuItem>

<MenuItem 
  disabled={STATUS_FLOW.indexOf("delivered") < STATUS_FLOW.indexOf(order.order_status)} 
  value="delivered"
>
  Delivered
</MenuItem>


        </Select>
                  </td>
                  <td className="px-2 md:px-3 py-1 md:py-3 font-[500] whitespace-nowrap">
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            
 

                  </td>
               
                  <td className="px-2 md:px-3 py-1 md:py-3 font-[500] whitespace-nowrap">
                    {order.name.toUpperCase()} 

                  </td>
                  <td className="px-2 md:px-3 py-1 md:py-3 font-[500] hidden md:table-cell">
                    {order.delivery_address?.mobile} 

                  </td>
                  <td className="px-2 md:px-3 py-1 md:py-3 font-[500] max-w-[300px] overflow-x-auto">
                    <span className="block w-[400px] text-wrap">
                      {order.delivery_address?.address_line} {order.delivery_address?.city}    {order.delivery_address?.pincode}  {order.delivery_address?.state}  {order.delivery_address?.country}  {order.delivery_address?.landmark},

                    </span>
 

                  </td>
              
                  <td className="px-2 md:px-3 py-1 md:py-3 font-[500]">
{order.total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </td>
                  <td className="px-2 md:px-3 py-1 md:py-3 font-[500]">
                    {order.email}	 

                  </td>
                     <td className="px-2 md:px-3 py-1 md:py-3 font-[500] text-secondary hidden md:table-cell text-nowrap">
                    {order.payment_id} 

                  </td>
                  <td className="px-2 md:px-3 py-1 md:py-3 font-[500]">
                    <span className="text-primary">


                   {order.userId}
                    </span>

                  </td>
               
           

                </tr>

                {
                  showProducts===index && (
                     <tr  >
                  <td colSpan="6" className=" pl-20"  >
                     <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500  rtl:text-right">
              <thead className="text-xs text-gray-700 bg-gray-50 ">
                <tr>
               
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Product Id

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Product Title

                  </th>
                  <th scope="col" className="py-3 px-6">
                    Image

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Quantity

                  </th>
                  <th scope="col" className="py-3 px-6">
                    Price

                  </th>
                  <th scope="col" className="py-3 px-6">
                    Sub Total

                  </th>
                
                </tr>
              </thead>
              <tbody>
                {
                  order?.products?.length>0 && order.products.map((product)=>{
                    return(
                         <tr key={product.productId} className="bg-white border-b ">
                  <td className="px-2 md:px-3 py-1 md:py-3 font-[500] text-gray-700 ">
                    {product.productId}

                  </td>
                  <td className="px-2 md:px-3 py-1 md:py-3 font-[500]">
                    <div className="w-[200px]">

                    {product.name}	 
                    </div>

                  </td>
                  <td className="px-2 md:px-3 py-1 md:py-3 font-[500]">
                    <img src={product.image[0]} alt="" className="w-[40px] h-[40px] object-cover rounded-md" />

                  </td>
                  <td className="px-2 md:px-3 py-1 md:py-3 font-[500] whitespace-nowrap">
                    {product.quantity}

                  </td>
                  <td className="px-2 md:px-3 py-1 md:py-3 font-[500]">
{product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </td>
                  <td className="px-2 md:px-3 py-1 md:py-3 font-[500]">
                    <span className="block w-[400px]">

{product.subtotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}                    </span>
 

                  </td>
                
           

                </tr>
                    )

                  })
                }
             
               
              
              </tbody>

            </table>
          </div>
                  </td>

                </tr>

                  )
                }
           
                      </React.Fragment>

                    )
                  })
                }
                {
                  !loading && orders.length===0 && 
    <tr>
      <td
        colSpan={9} 
        className="text-center py-6 text-gray-500 font-medium"
      >
        🚫 No Orders Found!
      </td>
    </tr>
                }


               
              </tbody>

            </table>

          </div>
            <div className="flex justify-center py-4">
  {pagination && (
    <Pagination
      count={pagination.totalPages}
      page={page}
      onChange={(e, value) => setPage(value)}
      color="primary"
      shape="rounded"
    />
  )}
</div>
   </div>
  )
}

export default Orders
