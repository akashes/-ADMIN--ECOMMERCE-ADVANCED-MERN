import React from 'react'

import Rating from '@mui/material/Rating';
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoIosClose, IoMdCloudUpload } from "react-icons/io";
import { Button } from '@mui/material';


const AddHomeSlide = () => {
  return (
    <section className="p-5  bg-gray-50">
      <form className="addProductForm  p-8 py-3 ">
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
              <div className="grid grid-cols-7 gap-4 ">
                            <div className="uploadBoxWrapper relative">
                                <span className="absolute w-[20px] h-[20px] opacity-90 rounded-full overflow-hidden bg-primary top-[-5px] right-[-5px] cursor-pointer flex items-center justify-center z-50">
                                    <IoIosClose className="text-white text-[19px]" />
                                </span>
                                
                         <div className='uploadBox p-0 rounded-md  overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors flex flex-col justify-center items-center relative'>
            
                                 <LazyLoadImage
                                 className="w-full h-full object-cover"
                                 effect="blur"
                                     wrapperProps={{
                               style: {transitionDelay: "1s"},
                }}
            
                  alt={"image"}
                                        src={'https://serviceapi.spicezgold.com/download/1749796588779_hp-15-fb0082ax-victus-gaming-laptop-amd-ryzen5-5600h-8gb-512gb-ssd-4-gb-nvidia-geforce-rtx-3050-graphics-windows-11-mso-fhd-39-6-cm-15-6-inch-digital-o493178411-p594412844-0-202406241824.jpeg'}
                                        />
                            </div>
                             </div>
                          
            
            
                            <UploadBox multiple={true}/>
                        </div>
    </div>
        <br /> 
        <br /> 
        <div className='w-[250px]'>

        <Button type="button" className="btn-blue btn-lg mt-3 w-full gap " >
            <IoMdCloudUpload className="text-[25px] text-white"/>
            Publish and View</Button>
        </div>


    </form>
    </section>
  )
}

export default AddHomeSlide
