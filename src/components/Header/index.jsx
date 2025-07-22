import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

import { FaUserAlt } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";

import { RiMenu2Line } from "react-icons/ri";
import { MyContext } from "../../App";



const Header = () => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 5,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: "0 4px",
      backgroundColor: "#ff5252",
    },
  }));

  const [anchorMyProfile, setAnchorMyProfile] = useState(null);
  const openMyProfile = Boolean(anchorMyProfile);
  const handleClickMyProfile = (event) => {
    setAnchorMyProfile(event.currentTarget);
  };
  const handleCloseMyProfile = () => {
    setAnchorMyProfile(null);
  };
 const context = useContext(MyContext)
  return (
    <header
    className={`w-full pr-7 shadow-md h-auto py-2 bg-[#fff]   ${context.isSidebarOpen===true?'pl-73':'pl-5'} flex items-center justify-between transition-all`}>
      <div className="part1">
        <Button className="!z-1000 !w-[50px] !h-[50px] !min-w-[40px] !rounded-md !text-black "
        onClick={()=>context.setIsSidebarOpen(!context.isSidebarOpen)}
        >
          <RiMenu2Line className="text-[25px]"/>
          
        </Button>
      </div>
 .     <div className="part2 w-[40%] flex items-center justify-end gap-5">
        {/* notification badge */}
        <StyledBadge badgeContent={4} color={"primary"}>
          <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-md !text-black ">
            <img
              src="/notification-bell.png"
              alt=""
              className="w-full object-cover "
            />
          </Button>
        </StyledBadge>
           {
          context.isLogin ===true ?
          (
               <div
          className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer"
          onClick={handleClickMyProfile}
        >
          <img
            src="data:image/webp;base64,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"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
          )
          :
          (
            <Button className="btn-blue btn-sm !shadow-lg !rounded-full">Sign In</Button>
          )
        }
     
     
      </div>

      <Menu
        anchorEl={anchorMyProfile}
        id="account-menu"
        open={openMyProfile}
        onClose={handleCloseMyProfile}
        onClick={handleCloseMyProfile}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
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
        {/* profile image and name  */}
        <MenuItem onClick={handleCloseMyProfile} className="!bg-white">
        <div className="flex items-center gap-3">
             {/* profile image */}
              <div
          className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer"
        >
          <img
            src="data:image/webp;base64,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"
            alt=""
            className="object-cover w-full h-full"
          />
              </div>

              <div className="info">
                <h3 className="text-[15px] font-[500] leading-5">Akash es</h3>
                <p  className="text-[12px] font-[400] opacity-70">akash@gmail.com</p>
              </div>

        </div>
        </MenuItem>
        <Divider/>
        <MenuItem onClick={handleCloseMyProfile}
        className="flex items-center gap-3 "
        >
        <FaUserAlt/> 
        <span className="text-[14px]">Profile</span>
        </MenuItem>
        <MenuItem onClick={handleCloseMyProfile}
        className="flex items-center gap-3 "
        >
        <IoLogOutSharp className="text-[18px]"/> 
        <span className="text-[14px]">Logout</span>
        </MenuItem>
    

      </Menu>
    </header>
  );
};

export default Header;
