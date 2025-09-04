import React, { useContext, useState } from 'react'

import { IoIosClose, IoMdCloudUpload } from "react-icons/io";
import { Button, MenuItem, Select } from '@mui/material';

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';
import { useDispatch } from 'react-redux';
import { addAddress } from '../../features/user/userSlice';
import { MyContext } from '../../App';


const AddAddress = () => {

  

    const context = useContext(MyContext)
    const dispatch = useDispatch()
    const[loading,setLoading]=useState(false)

     const [formData, setFormData] = useState({
            address_line: '',
            city: '',
            state: '',
            pincode: '',
            country: '',
            mobile:'',
            status:false,
});

     const handleSubmit=async(e)=>{
        e.preventDefault()
       if(!formData.address_line){
        showWarning('Please enter address line')
        return
       }
       if(!formData.city){
        showWarning('Please enter city')
        return
       }
       if(!formData.state){
        showWarning('Please enter state')
        return
       }
       if(!formData.pincode){
        showWarning('Please enter pincode')
        return
       }
       if(!formData.country){
        showWarning('Please enter country')
        return
       }
       if(!formData.mobile){
        showWarning('Please enter phone number')
        return
       }
       if(formData.pincode.length>6 || formData.pincode.length<6){
        showWarning('Please enter a valid pincode')
        return
       }
       console.log(formData.mobile.length)

       if(formData.mobile.length>13 || formData.mobile.length<13){
        showWarning('Please enter a valid phone number')
        return
       }
       setLoading(true)
       const resultAction = await dispatch(addAddress(formData))
       setLoading(false)
       console.log(resultAction)
       if(addAddress.fulfilled.match(resultAction)){
        showSuccess(resultAction.payload.message || 'Address added successfully')
        setFormData({
            address_line: '',
            city: '',
            state: '',
            pincode: '',
            country: '',
            mobile:'',
            status:false
        })
        context.setIsAddProductModalOpen({
            open:false,
            modal:''
        })
        return
       }
       if(addAddress.rejected.match(resultAction)){
        showError(resultAction.payload.message || 'Failed to add address')
        return
       }

     }
  
  return (
    <section className="p-5  bg-gray-50">
      <form className="addProductForm  p-3  md:p-8 py-3 " onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll md:pr-4 pt-4">
            <div className="grid  grid-cols-1 mb-3 gap-4">
          <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Address Line </h3>
            <input
              type="text"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm text-sm "
              value={formData.address_line}
              onChange={(e)=>setFormData({...formData,address_line:e.target.value})}
            />
          </div>
          
        </div>
            <div className="grid grid-cols-2 md:grid-cols-3 mb-3 gap-4">
              <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">City</h3>
            <input
              type="text"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm text-sm "
              value={formData.city}
              onChange={(e)=>setFormData({...formData,city:e.target.value})}
            />
          </div>
          <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">State</h3>
            <input
              type="text"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm text-sm "
              value={formData.state}
              onChange={(e)=>setFormData({...formData,state:e.target.value})}
            />
          </div>
          <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Pincode</h3>
            <input
              type="text"
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm text-sm "
              value={formData.pincode}
              onChange={(e)=>setFormData({...formData,pincode:e.target.value})}
            />
          </div>
          <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Country</h3>
            <input
              type="text"
                   className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm text-sm "
              value={formData.country}
              onChange={(e)=>setFormData({...formData,country:e.target.value})}
            />
          </div>
          <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Mobile</h3>
           
                            <PhoneInput
                    defaultCountry="in"
                    value={formData.mobile}
                    onChange={(phone) => setFormData({...formData,mobile:phone})}
                  />
          </div>
          <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Status</h3>

              <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.status}
          className='w-full'
          label="Age"
          onChange={(e)=>setFormData({...formData,status:e.target.value})}
          size='small'
        >
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </Select>
          </div>
        </div>







    
    </div>
     
        <div className='w-full md:w-[250px] mt-1 md:mt-5'>

        <Button disabled={loading} type="submit" className="btn-blue btn-lg  w-full gap " >            {loading ? 'Adding ...' : 'Add Address'}
            </Button>
        </div>


    </form>
    </section>
  )
}

export default AddAddress
