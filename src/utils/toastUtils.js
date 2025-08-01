import {toast} from 'react-hot-toast'

export const showSuccess = (msg,duration=2000,position='top-center') => toast.success(msg,{position,duration});
export const showError = (msg) => toast.error(msg);
export const showWarning = (msg) =>
  toast(msg, {
    icon: '⚠️',
    style: {
    //   border: '1px solid #facc15',
    //   background: '#fef9c3',
      color: '##5F5F5F',
    },
  });