import React, { useState } from 'react'
import Badge from '../../components/Badge'
import { FaAngleDown } from 'react-icons/fa'
import  Button  from '@mui/material/Button'
import SearchBox from '../../components/SearchBox'

const Orders = () => {

        const[showProducts,setShowProducts]=useState(null)
      const isShowOrderedProduct=(index)=>{
        if(showProducts===index){
          return setShowProducts(null)
    
    
        }
        setShowProducts(index)
      
    
      }

  return (
      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
    <div className="flex items-center justify-between px-3 py-5">
      <h2 className='text-[18px] font-[600]'>Recent Orders</h2>
      <div className='w-[40%]'>

      <SearchBox/>
      </div>
    </div>

     <div className="relative overflow-x-auto mt-5 pb-5">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
  {/* order related heading */}
  <thead className="text-xs text-gray-700 bg-gray-50">
    <tr>
      <th scope="col" className="py-3 px-6">&nbsp;</th>
      <th scope="col" className="py-3 px-6 whitespace-nowrap">Order Id</th>
      <th scope="col" className="py-3 px-6 whitespace-nowrap">Payment Id</th>
      <th scope="col" className="py-3 px-6">Name</th>
      <th scope="col" className="py-3 px-6 whitespace-nowrap">Phone No.</th>
      <th scope="col" className="py-3 px-6">Address</th>
      <th scope="col" className="py-3 px-6">PinCode</th>
      <th scope="col" className="py-3 px-6 whitespace-nowrap">Total Amount</th>
      <th scope="col" className="py-3 px-6">Email</th>
      <th scope="col" className="py-3 px-6 whitespace-nowrap">User Id</th>
      <th scope="col" className="py-3 px-6 whitespace-nowrap">Order Status</th>
      <th scope="col" className="py-3 px-6">Date</th>
    </tr>
  </thead>

  <tbody>
    {/* Order Row */}
    <tr className="bg-white  border-[#f1f1f1] border-b border-[#f1f1f1]-[#f1f1f1]">
      <td className="px-6 py-4 font-[500]">
        <Button
          className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#cfcdcd] !text-black"
          onClick={() => isShowOrderedProduct(0)}
        >
          {showProducts === 0 ? (
            <FaAngleDown className="text-[16px] rotate-180" />
          ) : (
            <FaAngleDown className="text-[16px]" />
          )}
        </Button>
      </td>
      <td className="px-6 py-4 font-[500] text-secondary">687cd457228db479bb93f3a6</td>
      <td className="px-6 py-4 font-[500] text-secondary">pay_QvJ5dNv8zOsr68</td>
      <td className="px-6 py-4 font-[500] whitespace-nowrap">Akash</td>
      <td className="px-6 py-4 font-[500]">913434455676</td>
      <td className="px-6 py-4 font-[500]"><span className="block w-[400px]">sdaf asdf erwt asdf asdfasdf</span></td>
      <td className="px-6 py-4 font-[500]">344355</td>
      <td className="px-6 py-4 font-[500]">1850</td>
      <td className="px-6 py-4 font-[500]">akashes5753279@gmail.com</td>
      <td className="px-6 py-4 font-[500]"><span className="text-secondary">6864d038228db479bb77c9a5</span></td>
      <td className="px-6 py-4 font-[500]"><Badge status="confirm" /></td>
      <td className="px-6 py-4 font-[500] whitespace-nowrap">2025-07-20</td>
    </tr>

    {/* Expandable Product Details */}
    {showProducts === 0 && (
      <tr>
        <td colSpan="6" className="pl-20">
          <div className="relative overflow-x-auto recentProductsTable ">
            <table className="w-full  text-sm text-left text-gray-500 rtl:text-right">
              <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                  <th className="py-3 px-6 whitespace-nowrap">Product Id</th>
                  <th className="py-3 px-6 whitespace-nowrap">Product Title</th>
                  <th className="py-3 px-6">Image</th>
                  <th className="py-3 px-6 whitespace-nowrap">Quantity</th>
                  <th className="py-3 px-6">Price</th>
                  <th className="py-3 px-6">Sub Total</th>
                </tr>
              </thead>
              <tbody>
                {/* to create two rows */}
                {[1, 2].map((_, i) => (
                  <tr key={i} className="bg-white border-b border-b-[#f1f1f1]">
                    <td className="px-6 py-4 font-[500] text-gray-700">123456789</td>
                    <td className="px-6 py-4 font-[500]">Product Title</td>
                    <td className="px-6 py-4 font-[500]">
                      <img
                        src="https://serviceapi.spicezgold.com/download/1742452458052_gemini-refined-sunflower-oil-1-l-product-images-o490012719-p490012719-0-202308301722.webp"
                        alt=""
                        className="w-[40px] h-[40px] object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 font-[500] whitespace-nowrap">2</td>
                    <td className="px-6 py-4 font-[500]">133</td>
                    <td className="px-6 py-4 font-[500]"><span className="block w-[400px]">675</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    )}

    {/* Another Order (Duplicate Data Just for Structure) */}
    <tr className="bg-white border-b border-b-[#f1f1f1]">
      <td className="px-6 py-4 font-[500]">
        <Button
          className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#cfcdcd] !text-black"
          onClick={() => isShowOrderedProduct(1)}
        >
          {showProducts === 1 ? (
            <FaAngleDown className="text-[16px] rotate-180" />
          ) : (
            <FaAngleDown className="text-[16px]" />
          )}
        </Button>
      </td>
      <td className="px-6 py-4 font-[500] text-secondary">687cd457228db479bb93f3a6</td>
      <td className="px-6 py-4 font-[500] text-secondary">pay_QvJ5dNv8zOsr68</td>
      <td className="px-6 py-4 font-[500] whitespace-nowrap">Akash</td>
      <td className="px-6 py-4 font-[500]">913434455676</td>
      <td className="px-6 py-4 font-[500]"><span className="block w-[400px]">sdaf asdf erwt asdf asdfasdf</span></td>
      <td className="px-6 py-4 font-[500]">344355</td>
      <td className="px-6 py-4 font-[500]">1850</td>
      <td className="px-6 py-4 font-[500]">akashes5753279@gmail.com</td>
      <td className="px-6 py-4 font-[500]"><span className="text-secondary">6864d038228db479bb77c9a5</span></td>
      <td className="px-6 py-4 font-[500]"><Badge status="confirm" /></td>
      <td className="px-6 py-4 font-[500] whitespace-nowrap">2025-07-20</td>
    </tr>

    {showProducts === 1 && (
      <tr>
        <td colSpan="6" className="pl-20">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
              <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                  <th className="py-3 px-6 whitespace-nowrap">Product Id</th>
                  <th className="py-3 px-6 whitespace-nowrap">Product Title</th>
                  <th className="py-3 px-6">Image</th>
                  <th className="py-3 px-6 whitespace-nowrap">Quantity</th>
                  <th className="py-3 px-6">Price</th>
                  <th className="py-3 px-6">Sub Total</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2].map((_, i) => (
                  <tr key={i} className="bg-white border-b">
                    <td className="px-6 py-4 font-[500] text-gray-700">123456789</td>
                    <td className="px-6 py-4 font-[500]">Product Title</td>
                    <td className="px-6 py-4 font-[500]">
                      <img
                        src="https://serviceapi.spicezgold.com/download/1742452458052_gemini-refined-sunflower-oil-1-l-product-images-o490012719-p490012719-0-202308301722.webp"
                        alt=""
                        className="w-[40px] h-[40px] object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 font-[500] whitespace-nowrap">2</td>
                    <td className="px-6 py-4 font-[500]">133</td>
                    <td className="px-6 py-4 font-[500]"><span className="block w-[400px]">675</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    )}
  </tbody>
</table>

          </div>
   </div>
  )
}

export default Orders
