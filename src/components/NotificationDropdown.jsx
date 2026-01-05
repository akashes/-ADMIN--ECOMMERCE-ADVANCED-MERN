import { useSelector, useDispatch } from "react-redux";
import { IoCopyOutline, IoNotificationsOutline } from "react-icons/io5";
import { clearNotifications } from "../features/dashboard/dashboardSlice";
import { Button, Badge, Tooltip } from "@mui/material";

import { styled } from "@mui/material/styles";
import { showSuccess } from "../utils/toastUtils";
const StyledBadge = styled(Badge)(({ theme }) => ({
"& .MuiBadge-badge": {
right: 5,
top: 13,
border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
padding: "0 4px",
backgroundColor: "#ff5252",
},
}));

export const NotificationDropdown = () => {
  const { notifications } = useSelector(state => state.dashboard);
  const dispatch = useDispatch();

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id);
    showSuccess('Order ID copied to clipboard');
  };

  return (
    // Outer group
    <div className="relative group py-2"> 
      {/* Bell Icon */}
      <div className="cursor-pointer relative">
        <StyledBadge badgeContent={notifications?.length} color={"primary"}>
          <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-md !text-black">
            <img src="/notification-bell.png" alt="" className="w-full object-cover" />
          </Button>
        </StyledBadge>
      </div>

      <div className="absolute right-0 top-full w-72 pt-2 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-50">
        
        <div className="bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
            <h4 className="font-bold">Recent Updates</h4>
            <button 
              onClick={() => dispatch(clearNotifications())}
              className="text-xs text-blue-600 hover:underline"
            >
              Clear all
            </button>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-center text-sm text-gray-500">No new notifications</p>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className="group/notify p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <p className="text-sm font-medium">{n.message}</p>
                    <span className="text-[10px] text-gray-400">{n.time}</span>
                  </div>

                  <Tooltip title="Copy ID" arrow placement="top">
                    <button
                      onClick={() => copyToClipboard(n.id)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all opacity-0 group-hover/notify:opacity-100"
                    >
                      <IoCopyOutline size={14} />
                    </button>
                  </Tooltip>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};