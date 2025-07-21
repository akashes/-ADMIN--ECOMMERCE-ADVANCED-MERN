import { Button } from '@mui/material'
import React, { useState } from 'react'
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



const Sidebar = () => {
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
   <div className="sidebar w-[18%] fixed top-0 left-0  h-full bg-[#fff] border-r border-[rgba(0,0,0,0.1)] py-2 px-2 ">
    <div className="w-full py-2">
        <Link to='/'>
        <img src="http://localhost:5173/logo.jpg" alt=""
        className='w-[120px] '
        />
        </Link>

    </div>

    <ul className='mt-4'>

        <li>
            <Link to='/'>
            <Button className='w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'>
               <RxDashboard className='text-[18px]'/> 
               <span>Dashboard</span>
                </Button>
            </Link>
        </li>
        <li>
            <Button className='w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'
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
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Home Banners List</Button>
                    </li>
                    <li className='!w-full'>
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Add Home Banner Slide</Button>

                    </li>
                </ul>
                </Collapse>
        </li>
        <li>
            <Button className='w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'
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
                        <Link to='/categories'>
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Category List</Button>
                        </Link>
                    </li>
                    <li className='!w-full'>
                        <Link to='/category-add' >
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Add A Category</Button>
                        </Link>

                    </li>
                    <li className='!w-full'>
                        <Link to='/category/subCat' >
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Sub Category List</Button>
                        </Link>

                    </li>
                    <li className='!w-full'>
                        <Link to='/category/subCat/add' >
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Add A Sub Category</Button>
                        </Link>

                    </li>
                </ul>
                </Collapse>
        </li>
        <li>
            <Button className='w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'
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
                <ul className='!w-full'> 
                    <li className='!w-full'>
                    <Link to='/products'>
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Product List</Button>
                    </Link>
                    </li>
                    <li className='!w-full'>
                        <Link to='/product/upload' >
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Product Upload</Button>
                        </Link>

                    </li>
                    <li className='!w-full'>
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Add Product RAMS</Button>

                    </li>
                    <li className='!w-full'>
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Add Product WEIGHT</Button>

                    </li>
                    <li className='!w-full'>
                        <Button className='!text-[rgba(0,0,0,0.7)] !justify-start   !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3'>
                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                            Add Product SIZE</Button>

                    </li>
                </ul>
                </Collapse>
        </li>
      
        <li>
            <Link to='/users' >
            <Button className='w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'>
               <FiUsers className='text-[18px]'/> 
               <span>Users</span>
                </Button>
            </Link>
        </li>
        <li>
            <Button className='w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'>
               <IoBagCheckOutline className='text-[18px]'/> 
               <span>Orders</span>
                </Button>
        </li>
        <li>
            <Button className='w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'>
               <LiaImages className='text-[18px]'/> 
               <span>Banners</span>
                </Button>
        </li>
        <li>
            <Button className='w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'>
               <ImBlog className='text-[18px]'/> 
               <span>Blogs</span>
                </Button>
        </li>
        <li>
            <Button className='w-full !capitalize  !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'>
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
   </div>
   </> 
  )
}

export default Sidebar
