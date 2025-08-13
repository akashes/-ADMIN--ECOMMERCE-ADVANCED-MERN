// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
// import React from 'react'

// const DeleteWarningDialog = ({open,handleClose,setDeleteId,deleteFunction,title,content}) => {
//   return (
//    <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {title}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             {content}

//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//           className='!bg-black !text-white btn-md'
//           onClick={()=>{
//             handleClose()
//             setDeleteId(null)
//           }}>Close</Button>
//           <Button className='!bg-secondary !text-white !btn-sm' onClick={deleteFunction} autoFocus>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//   )
// }

// export default DeleteWarningDialog







import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CiWarning } from "react-icons/ci";

// Custom styled dialog
const DarkDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#1e293b", // Dark blue-gray
    color: "#fff",
    borderRadius: "12px",
    padding: theme.spacing(1),
    minWidth: 400,
  },
}));

export default function DeleteWarningDialog({ open,handleClose,setDeleteId,deleteFunction,title,content,categoryName }) {
  return (
    <DarkDialog open={open} onClose={handleClose}>
      <DialogContent sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <Box
          sx={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderRadius: "50%",
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <CiWarning size={28} color="#f87171" />
        </Box>
        <Box>
          <Typography className="text-gray-800" variant="h6" sx={{ fontWeight: 600 }}>
            {title} <span className="text-primary">{categoryName}</span>?
          </Typography>
          <Typography className="!text-gray-700" variant="body2" sx={{ color: "#cbd5e1", mt: 1 }}>
            {content}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#334155",
            color: "#fff",
            textTransform: "none",
            "&:hover": { backgroundColor: "#475569" },
          }}
          onClick={
            ()=>{
                handleClose()
            setDeleteId(null)
            }
          }
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ef4444",
            color: "#fff",
            textTransform: "none",
            "&:hover": { backgroundColor: "#dc2626" },
          }}
          onClick={deleteFunction}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </DarkDialog>
  );
}
