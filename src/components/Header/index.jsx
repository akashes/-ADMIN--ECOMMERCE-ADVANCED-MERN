


import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Menu, MenuItem, Divider, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";

import { RiMenu2Line } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";

import { MyContext } from "../../App"; // Adjust path
import { logoutUser } from "../../features/auth/authSlice";
import { showError, showSuccess } from '../../utils/toastUtils';
import { NotificationDropdown } from "../NotificationDropdown";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "#ff5252",
  },
}));

const Header = () => {
  const context = useContext(MyContext);
  const { isLogin, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorMyProfile, setAnchorMyProfile] = useState(null);
  const openMyProfile = Boolean(anchorMyProfile);

  const handleClickMyProfile = (event) => {
    setAnchorMyProfile(event.currentTarget);
  };
  const handleCloseMyProfile = () => {
    setAnchorMyProfile(null);
  };

  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUser()).unwrap();
      if (result === 'success') {
        showSuccess('Logout successful');
        navigate('/login');
      }
    } catch (error) {
      showError('Failed to logout');
    }
  };

  return (
    <header
      className={`w-full pr-7 shadow-md h-auto py-2 bg-white fixed top-0 left-0 z-40
        flex items-center justify-between transition-all duration-300 ease-in-out
        ${context.isSidebarOpen && context.windowWidth >= 992 ? 'pl-[270px]' : 'pl-5'}
      `}
    >
      <div className="part1">
        <Button className="!w-[50px] !h-[50px] !min-w-[40px] !rounded-md !text-black"
          onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)}
        >
          <RiMenu2Line className="text-[25px]" />
        </Button>
      </div>

      <div className="part2 w-[40%] flex items-center justify-end gap-5">
        <NotificationDropdown/>
       

        {isLogin ? (
          <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer" onClick={handleClickMyProfile}>
            <img src={user?.avatar?.url} alt="" className="object-cover w-full h-full" />
          </div>
        ) : (
          <Link to='/login'>
            <Button className="btn-blue btn-sm !shadow-lg !rounded-full">Sign In</Button>
          </Link>
        )}
      </div>

      <Menu
        anchorEl={anchorMyProfile}
        id="account-menu"
        open={openMyProfile}
        onClose={handleCloseMyProfile}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleCloseMyProfile} className="!bg-white">
          <div className="flex items-center gap-3">
            <div className="rounded-full w-[35px] h-[35px] overflow-hidden">
              <img src={user?.avatar?.url} alt="" className="object-cover w-full h-full" />
            </div>
            <div className="info">
              <h3 className="text-[15px] font-[500] leading-5">{user?.name || 'User'}</h3>
              <p className="text-[12px] font-[400] opacity-70">{user?.email}</p>
            </div>
          </div>
        </MenuItem>
        <Divider />
        <Link to='/profile'>
          <MenuItem onClick={handleCloseMyProfile} className="flex items-center gap-3">
            <FaUserAlt /> <span className="text-[14px]">Profile</span>
          </MenuItem>
        </Link>
        <MenuItem onClick={() => { handleLogout(); handleCloseMyProfile(); }} className="flex items-center gap-3">
          <IoLogOutSharp className="text-[18px]" /> <span className="text-[14px]">Logout</span>
        </MenuItem>
      </Menu>
    </header>
  );
};

export default Header;