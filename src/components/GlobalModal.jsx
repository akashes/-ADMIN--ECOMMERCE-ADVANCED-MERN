import React, { useContext } from "react";
import { Dialog, Slide, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { IoIosClose } from "react-icons/io";
import { MyContext } from "../App"; // Adjust path to your App context

// Import all your form components here
import AddProduct from "../pages/Products/AddProduct";
import AddHomeSlide from "../pages/HomeSliderBanners/AddHomeSlide";
import AddCategory from "../pages/Category/AddCategory";
import AddSubCategory from "../pages/Category/AddSubCategory";
import AddAddress from "../pages/Address/addAddress";
import EditCategory from "../pages/Category/EditCategory";
import EditProduct from "../pages/Products/EditProduct";
import AddBannerV1 from "../pages/Banners/addBannerV1";
import AddBlog from "../pages/Blog/AddBlog";
import EditBlog from "../pages/Blog/EditBlog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GlobalModal = () => {
  // Listen to the Context
  const { isAddProductModalOpen, setIsAddProductModalOpen } = useContext(MyContext);

  const handleClose = () => {
    setIsAddProductModalOpen({ open: false, modal: '' });
  };

  // 2. Performance Check: If closed, render NOTHING. 
  // This keeps your app fast because these components don't exist in the DOM until needed.
  if (!isAddProductModalOpen.open) return null;

  return (
    <Dialog
      fullScreen
      open={isAddProductModalOpen.open}
      onClose={handleClose}
    //   TransitionComponent={Transition},
      slots={{
           transition: Transition,
         }}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <IoIosClose className='!text-gray-800' />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            <span className="text-gray-800">{isAddProductModalOpen?.modal}</span>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 3. Render the specific form based on the string in Context */}
      <div className="p-4"> 
        {isAddProductModalOpen?.modal === 'Add Product' && <AddProduct />}
        {isAddProductModalOpen?.modal === 'Add Home Slide' && <AddHomeSlide />}
        {isAddProductModalOpen?.modal === 'Add New Category' && <AddCategory />}
        {isAddProductModalOpen?.modal === 'Add New Sub Category' && <AddSubCategory />}
        {isAddProductModalOpen?.modal === 'Add New Address' && <AddAddress />}
        {isAddProductModalOpen?.modal === 'Edit Category' && <EditCategory />}
        {isAddProductModalOpen?.modal === 'Edit Product' && <EditProduct />}
        {isAddProductModalOpen?.modal === 'Add BannerV1' && <AddBannerV1 />}
        {isAddProductModalOpen?.modal === 'Add Blog' && <AddBlog />}
        {isAddProductModalOpen?.modal === 'Edit Blog' && <EditBlog />}
      </div>
    </Dialog>
  );
};

export default GlobalModal;