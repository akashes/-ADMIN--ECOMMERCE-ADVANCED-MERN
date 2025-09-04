import { Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { TiImage } from "react-icons/ti";
import { TbCategory } from "react-icons/tb";
import { TbBrandProducthunt } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { LiaImages } from "react-icons/lia";
import { ImBlog } from "react-icons/im";
import { IoLogoBuffer } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";

import { FaAngleDown } from "react-icons/fa6";

import {Collapse} from 'react-collapse';
import { MyContext } from '../../App';



const Sidebar = () => {
    const context = useContext(MyContext)
    const[subMenuIndex,setSubMenuIndex]=useState(null)

    const isOpenSubMenu=(index)=>{
      if(subMenuIndex===index){
        setSubMenuIndex(null)
      }else{
        setSubMenuIndex(index)
      }
    }
  return (
   <>
   <div
   className={`sidebar z-60  fixed top-0 left-0  h-full bg-[#fff]  border-r border-[rgba(0,0,0,0.1)] py-2 px-2
     w-[${context.isSidebarOpen===true?`${context.sidebarWidth/1.5}%`:'0px'}]
     `}
   
   >
    
   {
    context.isSidebarOpen && (
        <>
         <div className="w-full py-2">
        <Link to='/'>
        <img src="http://localhost:5173/user.png" alt=""
        className='w-[120px] '
        />
        </Link>

    </div>

    <ul className='mt-4 overflow-y-scroll max-h-[90vh]'>

        <li>
            <Link to='/'>
            <Button 
            onClick={()=>{context.windowWidth<992 && context.setIsSidebarOpen(false); setSubMenuIndex(null) }  } 
            className='w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'>
               <RxDashboard className='text-[18px]'/> 
               <span>Dashboard</span>
                </Button>
            </Link>
        </li>
        <li>
            <Button className={`w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center ${subMenuIndex===1 && '!bg-gray-300'}`}
              onClick={()=>isOpenSubMenu(1)}

            >
               <TiImage className='text-[18px]'/> 
               <span>Home Slides</span>
               <span className='ml-auto  w-[30px] h-[30px] flex items-center justify-center'
               >

               
                <FaAngleDown className={`${subMenuIndex===1 && 'rotate-180'} transition-transform duration-300 ease-in-out`} />
               </span>
                </Button>
                <Collapse isOpened={subMenuIndex===1}>
                <ul className='!w-full'> 
                    <li className='!w-full'>
                        <Link to='/homeSlider/list'>
                        <Button         
                            onClick={()=>{
                                context.windowWidth<992 && context.setIsSidebarOpen(false); 
                                context.windowWidth<992 && setSubMenuIndex(null)

                             }  } 
                             className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Home Banners List</Button>
                        </Link>
                    </li>
                    <li className='!w-full'>
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'
        onClick={()=>{
            context.setIsAddProductModalOpen({
                            open:true,
                            modal:'Add Home Slide'
                        })
                        context.windowWidth<992 && context.setIsSidebarOpen(false)
        }
      }                        >
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Add Home Banner Slide</Button>

                    </li>
                </ul>
                </Collapse>
        </li>
        <li>
            <Button className={`w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center ${subMenuIndex===2 && '!bg-gray-300'}`}
              onClick={()=>isOpenSubMenu(2)}

            >
               <TbCategory className='text-[18px]'/> 
               <span>Category</span>
               <span className='ml-auto  w-[30px] h-[30px] flex items-center justify-center'
               >

               
                <FaAngleDown className={`${subMenuIndex===2 && 'rotate-180'} transition-transform duration-300 ease-in-out`} />
               </span>
                </Button>
                <Collapse isOpened={subMenuIndex===2}>
                <ul className='!w-full'> 
                    <li className='!w-full'>
                        <Link to='/category/list'>
                        <Button 
                                                    onClick={()=>{context.windowWidth<992 && context.setIsSidebarOpen(false); setSubMenuIndex(null) }  } 

                        className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Category List</Button>
                        </Link>
                    </li>
                    <li className='!w-full'>
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'
                        
                        onClick={()=>{
                            context.setIsAddProductModalOpen({
                            open:true,
                            modal:'Add New Category'
                        }
                    )
                                            context.windowWidth<992 && context.setIsSidebarOpen(false)
                        }

                
                }
                        >
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Add A Category</Button>

                    </li>
                    <li className='!w-full'>
                        <Link to='/subCategory/list' >
                        <Button                                                     onClick={()=>{context.windowWidth<992 && context.setIsSidebarOpen(false); setSubMenuIndex(null) }  } 
  className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Sub Category List</Button>
                        </Link>

                    </li>
                    <li className='!w-full'>
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'
                           onClick={()=>{
                            context.setIsAddProductModalOpen({
                            open:true,
                            modal:'Add New Sub Category'
                        })
                                                                context.windowWidth<992 && context.setIsSidebarOpen(false)
                           }

                    }
                        >
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Add A Sub Category</Button>

                    </li>
                </ul>
                </Collapse>
        </li>
        <li>
            <Button className={`w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center ${subMenuIndex===3 && '!bg-gray-300'}`}
              onClick={()=>isOpenSubMenu(3)}

            >
               <TbBrandProducthunt className='text-[18px]'/> 
               <span>Products</span>
               <span className='ml-auto  w-[30px] h-[30px] flex items-center justify-center'
               >

               
                <FaAngleDown className={`${subMenuIndex===3 && 'rotate-180'} transition-transform duration-300 ease-in-out`} />
               </span>
                </Button>
                <Collapse isOpened={subMenuIndex===3}>
                <ul className='!w-full ms-2 border-l-1 border-gray-500 '> 
                    <li className='!w-full'>
                    <Link to='/products'>
                        <Button                                                     onClick={()=>{context.windowWidth<992 && context.setIsSidebarOpen(false); setSubMenuIndex(null) }  } 
 className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] '></span>
                            Product List</Button>
                    </Link>
                    </li>
                    <li className='!w-full'>
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'
                        onClick={()=>{
                            context.setIsAddProductModalOpen({
                            open:true,
                            modal:'Add Product'
                        })
                                                                                        context.windowWidth<992 && context.setIsSidebarOpen(false)

                        }}
                        >
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Product Upload</Button>

                    </li>
               
                </ul>
                </Collapse>
        </li>
      
        <li>
            <Link to='/users' >
            <Button                                                     onClick={()=>{context.windowWidth<992 && context.setIsSidebarOpen(false); setSubMenuIndex(null) }  } 
 className='w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'>
               <FiUsers className='text-[18px]'/> 
               <span>Users</span>
                </Button>
            </Link>
        </li>
        <li>
            <Link to='/orders'>
            <Button                         onClick={()=>context.windowWidth<992 && context.setIsSidebarOpen(false)}
 className='w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'>
               <IoBagCheckOutline className='text-[18px]'/> 
               <span>Orders</span>
                </Button>
            </Link>
        </li>
     
        <li>
            <Button  className={`w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center  ${subMenuIndex===4 && '!bg-gray-300'} `}
              onClick={()=>isOpenSubMenu(4)}
              

            >
               <LiaImages className='text-[18px]'/> 
               <span>Banners</span>
               <span className='ml-auto  w-[30px] h-[30px] flex items-center justify-center'
               >

               
                <FaAngleDown className={`${subMenuIndex===4 && 'rotate-180'} transition-transform duration-300 ease-in-out`} />
               </span>
                </Button>
                <Collapse isOpened={subMenuIndex===4}>
                <ul className='!w-full ms-2 border-l-1 border-gray-500 '> 
              
                    <li className='!w-full'>
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'
                        onClick={()=>{
                            context.setIsAddProductModalOpen({
                            open:true,
                            modal:'Add BannerV1'
                        })
                                                                                    context.windowWidth<992 && context.setIsSidebarOpen(false)
                        }

                    }
                        >
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Add Banner V1</Button>

                    </li>
                          <li className='!w-full'>
                    <Link to='/bannerV1/List'>
                        <Button   
                        onClick={()=>{context.windowWidth<992 && context.setIsSidebarOpen(false); setSubMenuIndex(null)}}
                        
                        className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] '></span>
                            Banner v1 List</Button>
                    </Link>
                    </li>
                 
                  
                </ul>
                </Collapse>
        </li>
       <li>
            <Button className={`w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center  ${subMenuIndex===5 && '!bg-gray-300'}`}
              onClick={()=>isOpenSubMenu(5)}

            >
               <ImBlog className='text-[18px]'/> 
               <span>Blogs</span>
               <span className='ml-auto  w-[30px] h-[30px] flex items-center justify-center'
               >

               
                <FaAngleDown className={`${subMenuIndex===5 && 'rotate-180'} transition-transform duration-300 ease-in-out`} />
               </span>
                </Button>
                <Collapse isOpened={subMenuIndex===5}>
                <ul className='!w-full ms-2 border-l-1 border-gray-500 '> 
              
                    <li className='!w-full'>
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'
                        onClick={()=>{
                            context.setIsAddProductModalOpen({
                            open:true,
                            modal:'Add Blog'
                        })
                                                                                        context.windowWidth<992 && context.setIsSidebarOpen(false)


                        }}
                        >
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Add Blog</Button>

                    </li>
                          <li className='!w-full'>
                    <Link to='/blog/list'>
                        <Button   onClick={()=>{context.windowWidth<992 && context.setIsSidebarOpen(false); setSubMenuIndex(null) }  }  className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] '></span>
                            Blog List</Button>
                    </Link>
                    </li>
    
                </ul>
                </Collapse>
        </li>
        <li>
            <Button                         onClick={()=>context.windowWidth<992 && context.setIsSidebarOpen(false)}
 className='w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'>
               <IoLogoBuffer className='text-[18px]'/> 
               <span>Manage Logo</span>
                </Button>
        </li>
        <li>
            <Button className='w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'>
               <AiOutlineLogout className='text-[18px]'/> 
               <span>Logout</span>
                </Button>
        </li>
    </ul>
        </>
    )
   }
   </div>
      {
          context?.isSidebarOpen===true && context?.windowWidth<992 &&
           <div onClick={()=>context.setIsSidebarOpen(false)} className="sidebarOverlay w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-50"></div>

        }
   </> 
  )
}

export default Sidebar
