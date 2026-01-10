import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification,updateOrderStats } from '../features/dashboard/dashboardSlice';
import { showSuccess } from '../utils/toastUtils';
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = useRef(null);
  const notificationSound = useRef(new Audio('/notification.mp3'))
const{isMuted}=useSelector(state=>state.dashboard)
  useEffect(() => {
    //  Initialize socket connection
    socket.current = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
    });

    //  Define Listeners
    socket.current.on('new-order-notification', (data) => {
        //notification sound
        if(!isMuted){

          notificationSound.current.play().catch(()=>console.log('Audio blocked'))
        }
      // Update global stats
      dispatch(updateOrderStats());

      // Add to notification list
      dispatch(addNotification({
        id: data.orderId,
        message: `New Order #${data.orderId.slice(-6)}`,
        customer:data.customer,
        total:data.total,
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
  }, [dispatch,isMuted]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket in any component
export const useSocket = () => useContext(SocketContext);