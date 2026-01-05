import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addNotification,updateOrderStats } from '../features/dashboard/dashboardSlice';
import { showSuccess } from '../utils/toastUtils';
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = useRef(null);

  useEffect(() => {
    //  Initialize socket connection
    socket.current = io('http://localhost:8000', {
      withCredentials: true,
    });

    //  Define Listeners
    socket.current.on('new-order-notification', (data) => {
      // Update global stats
      dispatch(updateOrderStats());

      // Add to notification list
      dispatch(addNotification({
        id: data.orderId,
        message: `New Order #${data.orderId.slice(-6)}`,
        time: new Date().toLocaleTimeString(),
        status: 'unread'
      }));
          let orderMsg;
    if(data?.orderId){
        orderMsg = `New Order #${data.orderId.slice(-6)}`
    }else{
        orderMsg=`New Order Received`
    }
    showSuccess(orderMsg)

    });

    //  Cleanup
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [dispatch]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket in any component
export const useSocket = () => useContext(SocketContext);