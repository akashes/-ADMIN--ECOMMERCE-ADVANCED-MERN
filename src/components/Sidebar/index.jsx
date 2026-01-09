

import { Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { TiImage } from "react-icons/ti";
import { TbCategory, TbBrandProducthunt } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { LiaImages } from "react-icons/lia";
import { FaAngleDown, FaPencilAlt } from "react-icons/fa";
import { MdLogout } from 'react-icons/md';
import { Collapse } from 'react-collapse';
import { useDispatch } from 'react-redux';

import { MyContext } from '../../App'; // Adjust path if needed
import { logoutUser } from '../../features/auth/authSlice';
import { showError, showSuccess } from '../../utils/toastUtils';

const Sidebar = () => {
    const context = useContext(MyContext)
    const [subMenuIndex, setSubMenuIndex] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isOpenSubMenu = (index) => {
        if (subMenuIndex === index) {
            setSubMenuIndex(null)
        } else {
            setSubMenuIndex(index)
        }
    }

    const handleLogout = async () => {
        try {
            const result = await dispatch(logoutUser()).unwrap()
            if (result === 'success') {
                showSuccess('Logout successful')
                navigate('/login')
            }
        } catch (error) {
            showError('Failed to logout')
        }
    }

    // Helper to close sidebar on mobile when clicking a link
    const handleMobileClose = () => {
        if (context.windowWidth < 992) {
            context.setIsSidebarOpen(false);
        }
    }

    return (
        <>
            {/* Sidebar Container */}
            <div
                className={`sidebar fixed top-0 left-0 h-full bg-white border-r border-[rgba(0,0,0,0.1)] py-2 
                transition-all duration-300 ease-in-out z-50 overflow-y-auto overflow-x-hidden
                ${context.isSidebarOpen ? 'w-[270px] opacity-100 px-2' : 'w-0 opacity-0 px-0'}
                `}
            >
                <div className="w-full py-2">
                    <Link to='/'>
                        <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1753426622/1750047766437_logo_nrxzi4.png" alt="Logo" className='w-[150px]' />
                    </Link>
                </div>

                <ul className='mt-4'>
                    {/* Dashboard */}
                    <li>
                        <Link to='/'>
                            <Button
                                onClick={() => { handleMobileClose(); setSubMenuIndex(null) }}
                                className='w-full !capitalize !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'>
                                <RxDashboard className='text-[18px]' />
                                <span>Dashboard</span>
                            </Button>
                        </Link>
                    </li>

                    {/* Home Slides */}
                    <li>
                        <Button className={`w-full !capitalize !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center ${subMenuIndex === 1 && '!bg-gray-300'}`}
                            onClick={() => isOpenSubMenu(1)}>
                            <TiImage className='text-[18px]' />
                            <span>Home Slides</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                                <FaAngleDown className={`${subMenuIndex === 1 && 'rotate-180'} transition-transform duration-300 ease-in-out`} />
                            </span>
                        </Button>
                        <Collapse isOpened={subMenuIndex === 1}>
                            <ul className='!w-full'>
                                <li className='!w-full'>
                                    <Link to='/homeSlider/list'>
                                        <Button onClick={() => { handleMobileClose(); setSubMenuIndex(null) }} className='!text-[rgba(0,0,0,0.7)] !justify-start !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'>
                                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                                            Home Banners List</Button>
                                    </Link>
                                </li>
                                <li className='!w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.7)] !justify-start !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'
                                        onClick={() => {
                                            context.setIsAddProductModalOpen({ open: true, modal: 'Add Home Slide' });
                                            handleMobileClose();
                                        }}>
                                        <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                                        Add Home Banner </Button>
                                </li>
                            </ul>
                        </Collapse>
                    </li>

                    {/* Category */}
                    <li>
                        <Button className={`w-full !capitalize !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center ${subMenuIndex === 2 && '!bg-gray-300'}`}
                            onClick={() => isOpenSubMenu(2)}>
                            <TbCategory className='text-[18px]' />
                            <span>Category</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                                <FaAngleDown className={`${subMenuIndex === 2 && 'rotate-180'} transition-transform duration-300 ease-in-out`} />
                            </span>
                        </Button>
                        <Collapse isOpened={subMenuIndex === 2}>
                            <ul className='!w-full'>
                                <li className='!w-full'>
                                    <Link to='/category/list'>
                                        <Button onClick={() => { handleMobileClose(); setSubMenuIndex(null) }} className='!text-[rgba(0,0,0,0.7)] !justify-start !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'>
                                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                                            Category List</Button>
                                    </Link>
                                </li>
                                <li className='!w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.7)] !justify-start !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'
                                        onClick={() => {
                                            context.setIsAddProductModalOpen({ open: true, modal: 'Add New Category' });
                                            handleMobileClose();
                                        }}>
                                        <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                                        Add A Category</Button>
                                </li>
                                <li className='!w-full'>
                                    <Link to='/subCategory/list' >
                                        <Button onClick={() => { handleMobileClose(); setSubMenuIndex(null) }} className='!text-[rgba(0,0,0,0.7)] !justify-start !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'>
                                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                                            Sub Category List</Button>
                                    </Link>
                                </li>
                                <li className='!w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.7)] !justify-start !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'
                                        onClick={() => {
                                            context.setIsAddProductModalOpen({ open: true, modal: 'Add New Sub Category' });
                                            handleMobileClose();
                                        }}>
                                        <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                                        Add A Sub Category</Button>
                                </li>
                            </ul>
                        </Collapse>
                    </li>

                    {/* Products */}
                    <li>
                        <Button className={`w-full !capitalize !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center ${subMenuIndex === 3 && '!bg-gray-300'}`}
                            onClick={() => isOpenSubMenu(3)}>
                            <TbBrandProducthunt className='text-[18px]' />
                            <span>Products</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                                <FaAngleDown className={`${subMenuIndex === 3 && 'rotate-180'} transition-transform duration-300 ease-in-out`} />
                            </span>
                        </Button>
                        <Collapse isOpened={subMenuIndex === 3}>
                            <ul className='!w-full ms-2 border-l-1 border-gray-500 '>
                                <li className='!w-full'>
                                    <Link to='/products'>
                                        <Button onClick={() => { handleMobileClose(); setSubMenuIndex(null) }} className='!text-[rgba(0,0,0,0.7)] !justify-start !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'>
                                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] '></span>
                                            Product List</Button>
                                    </Link>
                                </li>
                                <li className='!w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.7)] !justify-start !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'
                                        onClick={() => {
                                            context.setIsAddProductModalOpen({ open: true, modal: 'Add Product' });
                                            handleMobileClose();
                                        }}>
                                        <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                                        Product Upload</Button>
                                </li>
                            </ul>
                        </Collapse>
                    </li>

                    {/* Users */}
                    <li>
                        <Link to='/users' >
                            <Button onClick={() => { handleMobileClose(); setSubMenuIndex(null) }} className='w-full !capitalize !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'>
                                <FiUsers className='text-[18px]' />
                                <span>Users</span>
                            </Button>
                        </Link>
                    </li>

                    {/* Orders */}
                    <li>
                        <Link to='/orders'>
                            <Button onClick={handleMobileClose} className='w-full !capitalize !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center'>
                                <IoBagCheckOutline className='text-[18px]' />
                                <span>Orders</span>
                            </Button>
                        </Link>
                    </li>

                    {/* Banners */}
                    <li>
                        <Button className={`w-full !capitalize !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center ${subMenuIndex === 4 && '!bg-gray-300'} `}
                            onClick={() => isOpenSubMenu(4)}>
                            <LiaImages className='text-[18px]' />
                            <span>Banners</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                                <FaAngleDown className={`${subMenuIndex === 4 && 'rotate-180'} transition-transform duration-300 ease-in-out`} />
                            </span>
                        </Button>
                        <Collapse isOpened={subMenuIndex === 4}>
                            <ul className='!w-full ms-2 border-l-1 border-gray-500 '>
                                <li className='!w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.7)] !justify-start !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'
                                        onClick={() => {
                                            context.setIsAddProductModalOpen({ open: true, modal: 'Add BannerV1' });
                                            handleMobileClose();
                                        }}>
                                        <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                                        Add Banner V1</Button>
                                </li>
                                <li className='!w-full'>
                                    <Link to='/bannerV1/List'>
                                        <Button onClick={() => { handleMobileClose(); setSubMenuIndex(null) }} className='!text-[rgba(0,0,0,0.7)] !justify-start !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'>
                                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] '></span>
                                            Banner v1 List</Button>
                                    </Link>
                                </li>
                            </ul>
                        </Collapse>
                    </li>

                    {/* Blogs */}
                    <li>
                        <Button className={`w-full !capitalize !py-2 hover:!bg-[#f1f1f1] !text-[rgba(0,0,0,0.9)] !justify-start gap-3 !text-[14px] !font-[500] items-center ${subMenuIndex === 5 && '!bg-gray-300'}`}
                            onClick={() => isOpenSubMenu(5)}>
                            <FaPencilAlt className='text-[18px]' />
                            <span>Blogs</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                                <FaAngleDown className={`${subMenuIndex === 5 && 'rotate-180'} transition-transform duration-300 ease-in-out`} />
                            </span>
                        </Button>
                        <Collapse isOpened={subMenuIndex === 5}>
                            <ul className='!w-full ms-2 border-l-1 border-gray-300 '>
                                <li className='!w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.7)] !justify-start !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'
                                        onClick={() => {
                                            context.setIsAddProductModalOpen({ open: true, modal: 'Add Blog' });
                                            handleMobileClose();
                                        }}>
                                        <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)]'></span>
                                        Add Blog</Button>
                                </li>
                                <li className='!w-full'>
                                    <Link to='/blog/list'>
                                        <Button onClick={() => { handleMobileClose(); setSubMenuIndex(null) }} className='!text-[rgba(0,0,0,0.7)] !justify-start !capitalize !text-[13px] !font-[500] !pl-9 flex gap-3 w-full'>
                                            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] '></span>
                                            Blog List</Button>
                                    </Link>
                                </li>
                            </ul>
                        </Collapse>
                    </li>

                    {/* Logout */}
                    <li>
                        <Button onClick={handleLogout} className='w-full !capitalize !py-2 !justify-start gap-3 !text-[14px] !font-[500] items-center !bg-red-600 hover:!bg-red-500 !text-white !mt-2 '>
                            <MdLogout className='text-[18px]' />
                            <span>Logout</span>
                        </Button>
                    </li>
                </ul>
            </div>

            {/* Mobile Overlay - Only visible when sidebar is open AND width < 992 */}
            <div className={`sidebarOverlay w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-40
                transition-opacity duration-300
                ${context.isSidebarOpen && context.windowWidth < 992 ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
                `}
                onClick={() => context.setIsSidebarOpen(false)}
            />
        </>
    )
}

export default Sidebar