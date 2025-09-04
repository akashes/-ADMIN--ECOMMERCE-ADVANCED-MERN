import React, { useEffect, useState } from 'react'
import Badge from '../../components/Badge'
import { FaAngleDown } from 'react-icons/fa'
import  Button  from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, updateOrderStatus } from '../../features/order/orderSlice'
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select } from '@mui/material'
import { showError, showSuccess } from '../../utils/toastUtils'
import OrderSkelton from '../../components/Skeltons/OrderSkelton'
import { useCallback } from 'react'
import debounce from 'lodash.debounce';
import SearchBox from '../../components/SearchBox'
import useDebounce from '../../hooks/useDebounce'

const STATUS_FLOW = ["pending", "confirmed", "shipped", "on-the-way", "delivered"];



const Orders = () => {

  const [age, setAge] = React.useState('');
  
      const[searchTerm,setSearchTerm]=useState('')
      const debouncedSearchTerm = useDebounce(searchTerm,500)
  
  const handleChange = (event) => {
    setAge(event.target.value);
  };

   const dispatch = useDispatch()
  const{orders,pagination,loading}=useSelector(state=>state.order)
  const[page,setPage]=useState(1)
  const limit =10


  const [filters, setFilters] = useState({
  payment_method: "",
  payment_status: "",
  order_status: "",
  search: "",
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

      useEffect(()=>{
        dispatch(getOrders())

      },[])

      useEffect(()=>{
        dispatch(getOrders({page,limit,...filters}))

      },[dispatch,page,filters])

      useEffect(()=>{

        setPage(1)
      },[filters])

useEffect(() => {
  setFilters(prev => ({ ...prev, search: debouncedSearchTerm }))
}, [debouncedSearchTerm])

  return (
      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
  <div className="flex flex-wrap gap-4 items-end px-3 py-5">
    <h1 className='mx-auto font-[500] text-[22px] md:text-[25px]'>Ordres</h1>
  {/* Payment Method */}
  <div className="w-full sm:w-[48%] md:w-[20%]">
    <h4 className="font-[600] text-[13px] mb-2">Payment Method</h4>
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
  <div className="w-full sm:w-[48%] md:w-[20%]">
    <h4 className="font-[600] text-[13px] mb-2">Payment Status</h4>
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
  <div className="w-full sm:w-[48%] md:w-[20%]">
    <h4 className="font-[600] text-[13px] mb-2">Order Status</h4>
    <Select
      fullWidth
      size="small"
      value={filters.order_status}
      onChange={(e) =>
        setFilters({ ...filters, order_status: e.target.value })
      }
    >
      <MenuItem value="pending">PENDING</MenuItem>
      <MenuItem value="confirmed">CONFIRMED</MenuItem>
      <MenuItem value="shipped">SHIPPED</MenuItem>
      <MenuItem value="on-the-way">ON THE WAY</MenuItem>
      <MenuItem value="delivered">DELIVERED</MenuItem>
    </Select>
  </div>

  {/* Search + Clear */}
  <div className="w-full sm:w-[48%] md:w-[30%] flex gap-3 md:ml-auto">
    <SearchBox value={searchTerm} onChange={handleSearchChange} />
    <Button
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
                  <th scope="col" className="py-3 px-6">
                    &nbsp;

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Order Id 

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap hidden md:table-cell">
                    Payment Id

                  </th>
                  <th scope="col" className="py-3 px-6">
                    Name

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap hidden md:table-cell ">
                    Phone No.

                  </th>
                  <th scope="col" className="py-3 px-6">
                    Address

                  </th>
               
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Total Amount

                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    User Id

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    payment method

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Payment status

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Order Status

                  </th>
                  <th scope="col" className="py-3 px-6">
                    Date

                  </th>
                </tr>
              </thead>

              {/* order related table body */}
              <tbody>
                {
                  loading ? <OrderSkelton/>:
                  orders?.length>0 && orders.map((order,index)=>{
                    let disableOrderStatus = order.order_status==='delivered'
                    console.log(order)
                    return(
                      <>
                                      <tr className="bg-white border-b border-b-[rgba(0,0,0,0.2)] ">
                  <td className="px-6 py-4 font-[500]">
                      <Button  className="  !w-[25px] !h-[25px] !min-w-[25px] md:!w-[35px] md:!h-[35px] md:!min-w-[35px] !rounded-full !bg-[#cfcdcd] !text-black"
                    onClick={()=>isShowOrderedProduct(index)}
                    >
                      {
                        showProducts ===index ? <FaAngleDown className="text-[16px] rotate-180 text-gray-700 "/>: <FaAngleDown className="text-[16px] text-gray-700 "/> 
                      }
                    </Button>

                  </td>
                  <td className="px-6 py-4 font-[500] text-primary">
                    {order._id}

                  </td>
                  <td className="px-6 py-4 font-[500] text-secondary hidden md:table-cell">
                    {order.payment_id?order.payment_id:'CASH ON DELIVERY'} 

                  </td>
                  <td className="px-6 py-4 font-[500] whitespace-nowrap">
                    {order.name.toUpperCase()} 

                  </td>
                  <td className="px-6 py-4 font-[500] hidden md:table-cell">
                    {order.delivery_address?.mobile} 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <span className="block w-[400px]">
                      {order.delivery_address?.address_line} {order.delivery_address?.city}    {order.delivery_address?.pincode}  {order.delivery_address?.state}  {order.delivery_address?.country}  {order.delivery_address?.landmark},

                    </span>
 

                  </td>
              
                  <td className="px-6 py-4 font-[500]">
{order.total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </td>
                  <td className="px-6 py-4 font-[500]">
                    {order.email}	 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <span className="text-primary">


                   {order.userId}
                    </span>

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <span className="font-bold">


                  {
  order.payment_method === 'cod'
    ? 'CASH ON DELIVERY'
    : order.payment_method === 'razorpay'
    ? 'RAZORPAY'
    : order.payment_method === 'paypal'
    ? 'PAYPAL'
    : ''
}

                    </span>

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <span className="text-primary">


                   {order.payment_status}
                    </span>

                  </td>
                  <td className="px-6 py-4 font-[500]">
  <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={order?.order_status}
          label="Age"
          onChange={(e)=>validateOrderTransition(order,e.target.value)}
          size='small'
          style={{zoom:'80%'}}
          className='w-full'
          disabled={disableOrderStatus}
      
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
                  <td className="px-6 py-4 font-[500] whitespace-nowrap">
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            
 

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
                  <td className="px-6 py-4 font-[500] text-gray-700 ">
                    {product.productId}

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <div className="w-[200px]">

                    {product.name}	 
                    </div>

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <img src={product.image[0]} alt="" className="w-[40px] h-[40px] object-cover rounded-md" />

                  </td>
                  <td className="px-6 py-4 font-[500] whitespace-nowrap">
                    {product.quantity}

                  </td>
                  <td className="px-6 py-4 font-[500]">
{product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </td>
                  <td className="px-6 py-4 font-[500]">
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
           
                      </>

                    )
                  })
                }


               
              </tbody>

            </table>
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
   </div>
  )
}

export default Orders
