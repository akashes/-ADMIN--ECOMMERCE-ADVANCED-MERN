import React, { useContext, useEffect, useState } from 'react'
import DashboardBoxes from '../../components/DashboardBoxes'
import { Button, Pagination } from '@mui/material'
import { FaAngleDown } from 'react-icons/fa6'
import Badge from '../../components/Badge'
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom'
import { FcCancel } from "react-icons/fc";
import ProgressBar from '../../components/ProgressBar'
import { AiFillEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TooltipMUI from '@mui/material/Tooltip';


import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { MyContext } from '../../App'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../features/category/categorySlice'
import AlertBox from '../../components/AlertBox'
import { CircularProgress, Rating } from '@mui/material';
import useDebounce from '../../hooks/useDebounce'
import { deleteMultipleProducts, deleteProduct, getAllProducts, setProductAdded } from '../../features/product/productSlice'
import SearchBox from '../../components/SearchBox'
import { getOrders } from '../../features/order/orderSlice'
import RevenueChart from '../../components/Charts/RevenueChart'
import OrderChart from '../../components/Charts/OrderChart'
import ProductsSkeleton from '../../components/Skeltons/ProductsSkelton'



const columns=[
  {id:'product',label:'PRODUCT',minWidth:150},
  {id:'category',label:'CATEGORY',minWidth:100},
  {id:'subcategory',label:'SUB CATEGORY',minWidth:150},
  {id:'price',label:'PRICE',minWidth:100},
  {id:"sales",label:'SALES',minWidth:130},
  {id:"rating",label:'RATING',minWidth:130},
  {id:'action',label:'ACTION',minWidth:120}
]

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}





const Dashboard = () => {
  // products table related 
    const{products,totalProducts,totalPages,currentPage,productAdded,loading:productsLoading}=useSelector(state=>state.product)
  const{categories}=useSelector(state=>state.category)
  const navigate = useNavigate()
  const auth = useSelector(state=>state.auth)
    const context = useContext(MyContext)
    const dispatch = useDispatch()
const [isAlertOpen, setIsAlertOpen] = useState(false);
const [deleteTarget, setDeleteTarget] = useState({ type: "", ids: [] });

const[isDeleting,setIsDeleting]=useState([])
const[deleteArray,setDeleteArray]=useState([])


  const handleDeleteProduct=async(id)=>{
        setIsDeleting(prev=>[...prev,id])
        const resultAction = await dispatch(deleteProduct(id))
        console.log(resultAction)
        if(deleteProduct.fulfilled.match(resultAction)){
          setIsDeleting([])
          showSuccess(resultAction.payload.message || 'Product deleted successfully')
      }
      if(deleteProduct.rejected.match(resultAction)){
        setIsDeleting([])
        showError(resultAction.payload || 'Failed to delete product')
      }
      }



       const handleDeleteMultipleProducts=async(ids)=>{
        setIsDeleting(prev=>[...prev,...ids])
        console.log(`deleting multiple products`)
        console.log(ids)
      const resultAction  = await dispatch(deleteMultipleProducts(ids))
      console.log(resultAction)
        if(deleteMultipleProducts.fulfilled.match(resultAction)){
          
          showSuccess(resultAction.payload.message || 'Products deleted successfully')
      }
      if(deleteMultipleProducts.rejected.match(resultAction)){
        showError(resultAction.payload || 'Failed to delete products')
      }
          setIsDeleting([])


      }


const handleConfirmDelete = async () => {
  setIsAlertOpen(false);

  if (deleteTarget.type === "single") {
    await handleDeleteProduct(deleteTarget.ids[0]);
  } else if (deleteTarget.type === "multiple") {
    await handleDeleteMultipleProducts(deleteTarget.ids);
    setDeleteArray([]); // Clear selection
  }
  setDeleteTarget({type:'',ids:[]})
};
const confirmDeleteProduct = (id) => {
  setDeleteTarget({ type: "single", ids: [id] });
  setIsAlertOpen(true);
};


const confirmDeleteMultiple = () => {
  if (deleteArray.length === 0) return;
  setDeleteTarget({ type: "multiple", ids: deleteArray });
  setIsAlertOpen(true);
};

console.log(deleteArray)


    const[searchTerm,setSearchTerm]=useState('')
    const debouncedSearchTerm = useDebounce(searchTerm,500)
    const [ratingFilter, setRatingFilter] = useState('');

    console.log(deleteTarget)

    const[formFields,setFormFields]=useState({
    category: '',
    catName: '',
    subCat: '',
    subCatId: '',
    thirdSubCat: '',
    thirdSubCatId: ''
    })
    console.log(formFields)

      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const [page, setPage] = React.useState(0);
    
          const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
      const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    
     



      const handleChangeProductCat = (event) => {
  const selectedCategoryId = event.target.value;
  const selectedCategoryObj = categories.find(cat => cat._id === selectedCategoryId);
  const selectedCategoryName = selectedCategoryObj?.name?.toLowerCase() || '';

  setFormFields(prev => ({
    ...prev,
    category: selectedCategoryId,
    catName: selectedCategoryName,
    subCat: '',
    subCatId: '',
    thirdSubCat: '',
    thirdSubCatId: ''
  }));


};

const handleChangeProductSubCat = (event) => {
  const newSubCatId = event.target.value;

  const subCatName =
    selectedRootCategory?.children?.find(child => child._id === newSubCatId)?.name?.toLowerCase() || '';

  setFormFields((prev) => ({
    ...prev,
    subCat: subCatName,
    subCatId: newSubCatId,
    thirdSubCat: '',
    thirdSubCatId: ''
  }));

  
};




const handleChangeThirdLevelSubCat = (event) => {
  const newThirdLevelSubCatId = event.target.value;
  const thirdLevelSubCatName = thirdLevelCategories.find(cat => cat._id === newThirdLevelSubCatId)?.name?.toLowerCase() || '';

  setFormFields(prev => ({
    ...prev,
    thirdSubCat: thirdLevelSubCatName,
    thirdSubCatId: newThirdLevelSubCatId
  }));


};

  const handleSearchChange = (e) => {
    console.log('inside handlesearch chagne')
    setSearchTerm(e.target.value);
  };

 const  handleSelectMultipleDelete=(id,checked)=>{
   setDeleteArray((prev)=>{
    if(checked){
      return [...prev,id]
    }else{
      return prev.filter(pid=>pid!==id)
    }
   })
  }
  const handleSelectAllDelete = (checked) => {
  if (checked) {
    const ids = products.map(p => p._id);
    setDeleteArray(ids);
  } else {
    setDeleteArray([]);
  }
};

  const handleClearAllFilters = () => {
  setFormFields({
    category: '',
    catName: '',
    subCat: '',
    subCatId: '',
    thirdSubCat: '',
    thirdSubCatId: ''

  });
  setRatingFilter('');
  setSearchTerm('');
  setDeleteArray([])
  setPage(0);
};

      useEffect(()=>{
        const params={
          page:page+1,
          perPage:rowsPerPage
        }

        if(productAdded){
          dispatch(getAllProducts(params))
          setProductAdded(false)
        }

  if (formFields.category) params.category = formFields.category;
  if (formFields.subCatId) params.subCatId = formFields.subCatId;
  if (formFields.thirdSubCatId) params.thirdSubCatId = formFields.thirdSubCatId;

  //search filter
  if(debouncedSearchTerm.trim() !=''){
    params.search = debouncedSearchTerm.trim();
  }
    if (ratingFilter) params.minRating = ratingFilter;

  const fetchProductData=async()=>{
    console.log(page,rowsPerPage)
     dispatch(getAllProducts(params))
  }
  fetchProductData()

},[dispatch,page,rowsPerPage,productAdded,formFields,debouncedSearchTerm,ratingFilter])

useEffect(()=>{

  dispatch(getCategories())
},[])
useEffect(() => {
  setPage(0);
}, [ratingFilter]);

const selectedRootCategory = categories.find((category) => category._id === formFields.category);
const subCategories = selectedRootCategory?.children || [];
const selectedSubCategory = subCategories.find((category) => category._id === formFields.subCatId);
const thirdLevelCategories = selectedSubCategory?.children || [];


 

    const [categoryFilterVal, setCategoryFilterVal] = React.useState('');














    const[showProducts,setShowProducts]=useState(null)
  const isShowOrderedProduct=(index)=>{
    if(showProducts===index){
      return setShowProducts(null)


    }
    setShowProducts(index)
  

  }
  console.log(showProducts)
  const[isOpen,setIsOpen]=useState(false)
     useEffect(()=>{
  
          const fetchCategoriesFunction=async()=>{
  
            const resultAction = await dispatch(getCategories())
         
  
          }
          fetchCategoriesFunction()
  
  
        },[])


          const{orders}=useSelector(state=>state.order)
          console.log(orders)
        
              //   const[showProducts,setShowProducts]=useState(null)
              // const isShowOrderedProduct=(index)=>{
              //   if(showProducts===index){
              //     return setShowProducts(null)
            
            
              //   }
              //   setShowProducts(index)
              
            
              // }
        
              useEffect(()=>{
                dispatch(getOrders())
        
              },[])
  return (
   <>
   {/* gretting container with cta button */}
   <div className='w-full border  p-4 sm:p-6 md:p-8 bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex flex-col-reverse md:flex-row items-center gap-4 sm:gap-5  md:gap-8 mb-5 justify-center md:justify-between rounded-md  '>
    <div className='info'>
      <h1 className='text-2xl sm:text-3xl md:text-[35px]
leading-snug sm:leading-normal font-bold  mb-3 '>Welcome, {context.windowWidth>992 && <br /> } <span className='text-secondary block   sm:inline'>{auth.user?.name}</span>  
       <svg
          style={{ display: 'inline', verticalAlign: 'top' }} 

                  width="36"
                  height="36"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="home__hand"
                >
                  <path
                    d="M25.4995 32.0305L31.3495 33.1555L36.1495 8.48051C36.4495 6.83051 35.3995 5.18051 33.8245 4.88051C32.1745 4.58051 30.5995 5.70551 30.2995 7.35551L25.4995 32.0305Z"
                    fill="#FFDD67"
                  ></path>
                  <path
                    d="M33.8996 4.88018C33.6746 4.80518 33.5246 4.80518 33.2996 4.80518C34.6496 5.33018 35.3996 6.75518 35.0996 8.25518L30.2996 32.9302L31.3496 33.1552L36.1496 8.48018C36.5246 6.75518 35.4746 5.18018 33.8996 4.88018Z"
                    fill="#EBA352"
                  ></path>
                  <path
                    d="M19.4995 32.7802H26.5495V5.55518C26.5495 3.53018 24.9745 1.80518 23.0245 1.80518C21.1495 1.80518 19.4995 3.45518 19.4995 5.55518V32.7802Z"
                    fill="#FFDD67"
                  ></path>
                  <path
                    d="M23.0995 1.80518C22.9495 1.80518 22.7245 1.80518 22.5745 1.88018C24.2995 2.18018 25.5745 3.68018 25.5745 5.55518V32.8552H26.6245V5.55518C26.6245 3.45518 25.0495 1.80518 23.0995 1.80518Z"
                    fill="#EBA352"
                  ></path>
                  <path
                    d="M15.7495 32.7054L21.7495 31.1304L15.2245 6.30541C14.7745 4.58041 13.0495 3.53041 11.3995 3.90541C9.74948 4.35541 8.77448 6.08041 9.22448 7.80541L15.7495 32.7054Z"
                    fill="#FFDD67"
                  ></path>
                  <path
                    d="M11.3995 3.90541L10.9495 4.13041C12.4495 4.05541 13.7995 5.03041 14.2495 6.60541L20.7745 31.4304L21.8245 31.1304L15.2245 6.30541C14.7745 4.58041 13.0495 3.53041 11.3995 3.90541Z"
                    fill="#EBA352"
                  ></path>
                  <path
                    d="M2.99937 10.355C1.57437 11.03 1.12437 12.83 1.87437 14.33L11.7744 34.055L16.7994 31.505L6.89937 11.78C6.14937 10.28 4.42437 9.68 2.99937 10.355Z"
                    fill="#FFDD67"
                  ></path>
                  <path
                    d="M2.99956 10.355C2.84956 10.43 2.69956 10.505 2.54956 10.655C3.82456 10.28 5.24956 10.955 5.92456 12.305L15.8246 32.03L16.7996 31.58L6.89956 11.78C6.14956 10.28 4.42456 9.68 2.99956 10.355Z"
                    fill="#EBA352"
                  ></path>
                  <path
                    d="M46.2744 22.2801C45.0744 19.9551 41.3244 20.1051 37.4994 24.3051C34.7994 27.2301 34.2744 28.2051 31.5744 28.1301V25.0551C31.5744 25.0551 25.7994 20.7801 14.3244 22.7301C14.3244 22.7301 7.79945 23.6301 7.79945 27.0801C7.79945 27.0801 6.67445 35.4051 8.99945 40.6551C12.4494 48.4551 30.1494 50.4801 35.6994 37.2051C36.8244 34.5801 39.0744 32.6301 41.0994 30.1551C43.4244 27.1551 47.5494 24.7551 46.2744 22.2801Z"
                    fill="#FFDD67"
                  ></path>
                  <path
                    d="M46.2745 22.28C46.0495 21.83 45.7495 21.53 45.3745 21.23C45.4495 21.305 45.5245 21.38 45.5245 21.53C46.7995 24.08 42.6745 26.405 40.1995 29.405C38.1745 31.88 35.9245 33.83 34.7995 36.455C29.9995 47.93 16.0495 47.93 10.1995 42.68C15.5245 48.68 30.5245 49.28 35.5495 37.205C36.6745 34.58 38.9245 32.63 40.9495 30.155C43.4245 27.155 47.5495 24.755 46.2745 22.28ZM32.3245 28.13C27.4495 26.33 18.7495 29.63 19.9495 38.405C19.9495 30.23 27.3745 28.205 31.4245 28.205C32.0245 28.13 32.3245 28.13 32.3245 28.13Z"
                    fill="#EBA352"
                  ></path>
                </svg>
       
       </h1>
      <p className='text-gray-800 text-sm sm:text-base max-w-[500px] '>Here’s What happening on your store today. See the statistics at once.</p>
      <br />
       <Button className='btn-blue flex items-center gap-2 !capitalize  px-4 py-2 text-sm sm:text-base '
       onClick={()=>context.setIsAddProductModalOpen({open:true,modal:'Add Product'})}
       >
        <img src="/ecommerce.png" alt="" className='w-6 sm:w-7 ' />
        Add Product
       </Button>
    </div>

    {/* welcome banner image */}
    <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1753076866/shop-illustration_lpdjyl.webp" alt="" className=' w-[220px]  md:w-[250px] max-w-full' />

   </div>
   <DashboardBoxes/>

 


   <>
   <div className="flex  items-center justify-between px-2 py-0 mt-5 gap-3">
  {/* title */}
  <h2 className="text-[18px]  md:text-[22px] font-[600] text-nowrap"> Products</h2>

  {/* Buttons Section */}
  <div className="flex items-center gap-3 w-full sm:w-auto justify-end sm:justify-between">
    {deleteArray.length > 0 && (
      <Button
        onClick={confirmDeleteMultiple}
        className="btn !bg-red-600 !text-white btn-sm"
      >
        Delete
      </Button>
    )}
    <Button
      className="btn-blue btn-sm"
      onClick={() =>
        context.setIsAddProductModalOpen({ open: true, modal: "Add Product" })
      }
    >
      Add Product
    </Button>
  </div>
</div>
   <div className="card my-4 shadow-md sm:rounded-lg bg-white pt-5">
  
      <div className="flex flex-wrap items-center w-full px-5 justify-between gap-4">
        
             <div className="w-full sm:w-[48%] md:w-[23%] lg:w-[15%]">
      <h4 className="font-[600] text-[13px] mb-2">Category</h4>
      <Select
        disabled={categories.length === 0}
        style={{ zoom: "80%" }}
        value={formFields.category}
        onChange={handleChangeProductCat}
        className="w-full"
        size="small"
      >
        <MenuItem value="">None</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
             </div>
                 {/* Sub Category */}
    <div className="w-full sm:w-[48%] md:w-[23%] lg:w-[15%]">
      <h4 className="font-[600] text-[13px] mb-2">Sub Category</h4>
      <Select
        disabled={formFields.category === "" || subCategories.length === 0}
        style={{ zoom: "80%" }}
        value={formFields.subCatId}
        onChange={handleChangeProductSubCat}
        className="w-full"
        size="small"
      >
        <MenuItem value="">None</MenuItem>
        {subCategories.map((subCategory) => (
          <MenuItem key={subCategory._id} value={subCategory._id}>
            {subCategory.name}
          </MenuItem>
        ))}
      </Select>
    </div>

    {/* Third Level Category */}
    <div className="w-full sm:w-[48%] md:w-[23%] lg:w-[15%]">
      <h4 className="font-[600] text-[13px] mb-2">Third level Category</h4>
      <Select
        disabled={
          formFields.category === "" ||
          formFields.subCat === "" ||
          thirdLevelCategories.length === 0
        }
        style={{ zoom: "80%" }}
        value={formFields.thirdSubCatId}
        onChange={handleChangeThirdLevelSubCat}
        className="w-full"
        size="small"
      >
        <MenuItem value="">None</MenuItem>
        {thirdLevelCategories.map((thirdLevelCategory) => (
          <MenuItem key={thirdLevelCategory._id} value={thirdLevelCategory._id}>
            {thirdLevelCategory.name}
          </MenuItem>
        ))}
      </Select>
    </div>

    {/* Rating */}
    <div className="w-full sm:w-[48%] md:w-[23%] lg:w-[15%]">
      <h4 className="font-[600] text-[13px] mb-2">Min Rating</h4>
      <Rating
        value={ratingFilter}
        precision={1}
        onChange={(event, newValue) => setRatingFilter(newValue)}
      />
    </div>

    {/* Search + Clear */}
    <div className="w-full md:w-[48%] lg:w-[25%] flex gap-3 items-center">
      <SearchBox value={searchTerm} onChange={handleSearchChange} />
      <Button
        className="!min-w-[120px]"
        variant="outlined"
        color="error"
        size="small"
        onClick={handleClearAllFilters}
      >
        Clear
      </Button>
    </div>


       

  

      
      </div>
      <br />

    <TableContainer sx={{ maxHeight: 440 }}>

         {
              productsLoading && 
            <ProductsSkeleton/>

              
            }
            {
              !productsLoading && products.length>0 &&
                <Table 
        stickyHeader aria-label="sticky table">
          <TableHead className='bg-[#f1f1f1]'>
            <TableRow>
              <TableCell>
                <Checkbox checked={products.length>0 && deleteArray.length===products.length}
                onChange={(e)=>handleSelectAllDelete(e.target.checked)}
                {...label} size='small'/>
                  
                
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
           
         
            {
              products.length===0 &&    <TableRow>
                <TableCell colSpan={7}>
              <div className='flex items-center justify-center w-full min-h-[200px]'>


                <h2 className='text-secondary font-bold text-[25px] text-center'>No Products Found!</h2>
                </div>

                </TableCell>
              </TableRow>

            }
            {
              // products.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
         !productsLoading &&  products.length>0 &&  products?.map((product)=>(

                <TableRow className={`${isDeleting.includes(product._id) && 'uploading-gradient-delete'}`} key={product._id} >
              <TableCell style={{minWidth:columns.minWidth}}>
                <Checkbox checked={deleteArray.includes(product._id)} onChange={(e)=>handleSelectMultipleDelete(product._id,e.target.checked)} {...label} size='small'/>

              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <div className="flex items-center gap-4 w-[300px]"><div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                  <Link to={`/product/${product._id}`}>
                       <LazyLoadImage
                                    className="w-full h-full object-cover  group-hover:scale-105 transition-transform"
                                    effect="blur"
                                    wrapperProps={{
                                      style: { transitionDelay: "1s" },
                                    }}
                                    alt={"preview"}
                                    src={product?.images && product?.images[0]?.url}
                                  />
                  </Link>
              
                </div><div className="info w-[75%]">
                  <Link href={`/product/${product._id}`} data-discover="true"
                  ><h3 className="font-[700] text-[13px] leading-4 hover:text-secondary">{product.name}</h3>
                </Link>
                <span className="text-[12px]">{product?.brand}</span>
                </div></div>

              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                 {product.catName}
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                  {product?.subCat}
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex  gap-1 flex-col">
                <span className='oldPrice line-through text-gray-500 text-[13px] font-[500]'> &#x20b9;{product.oldPrice}</span>
                <span className="price text-primary font-[600] text-[14px]">&#x20b9;{product.price}</span>
                
            </div>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                  <p className='text-[14px] w-[100px]'>
      <span className='font-[800] mr-1'>

    {product?.sale}
      </span>
       sale

    </p>

              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                  <p className='text-[14px] w-[100px]'>
      
       <Rating defaultValue={product.rating} size='small' readOnly  />

    </p>

              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                   <div className="flex items-center gap-1">
      <TooltipMUI placement='top' title='Edit Product'>

      <Button 
                    onClick={()=>context.setIsAddProductModalOpen({open:true,modal:'Edit Product',id:product._id})}

      className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !min-w-[35px]  !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'>

        <AiFillEdit  className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
      </Button>

      
      </TooltipMUI>
      <TooltipMUI placement='top' title='View Product details'>

      <Link to={`/product/${product._id}`}>
      <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !min-w-[35px]  !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'>

        <FaEye className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
      </Button>
      </Link>
      </TooltipMUI>
      <TooltipMUI placement='top' title='Remove Product'>

      <Button 
      // onClick={()=>handleDeleteProduct(product._id)}
      onClick={()=>confirmDeleteProduct(product._id)}
      className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !min-w-[35px]  !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'>

        <MdDelete className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
      </Button>
      </TooltipMUI>
    </div>
              </TableCell>
        
            </TableRow>
            ))

            }

          
    
          
          </TableBody>
        </Table>
            }
      
      </TableContainer>
      {
        !productsLoading && products?.length>0 &&
           <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      }
    



        

   </div> 


   <AlertBox
  open={isAlertOpen}
  onClose={() => {
    setIsAlertOpen(false)
    setDeleteArray([])
    setDeleteTarget({type:'',ids:[]})
  }}
  onConfirm={handleConfirmDelete}
  title={deleteTarget.type === "multiple" ? "Delete Multiple Products" : "Delete Product"}
  description={
    deleteTarget.type === "multiple"
      ? `Are you sure you want to delete all selected (${deleteArray.length}) products? This action cannot be undone.`
      : "Are you sure you want to delete this product? This action cannot be undone."
  }
/>

   </>



 {/* recent orders section */}
  <div className="flex items-center justify-between px-3 pt-10">
      <h2 className='text-[18px] md:text-[22px] font-[600]'>Recent Orders</h2>
      <Button onClick={()=>navigate('/orders')}>View All Orders</Button>
    </div>
   <div className="card my-4 shadow-md sm:rounded-lg bg-white">
   

     <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left text-gray-500  rtl:text-right">
                    {/* order related heading */}
                      <thead className="text-xs text-gray-700 bg-gray-50 min-h-[120px]  ">
                        <tr>
                          <th scope="col" className="py-3 px-6">
                            &nbsp;
        
                          </th>
                          <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            Order Id 
        
                          </th>
                          <th scope="col" className="py-3 px-6 whitespace-nowrap hidden md:table-cell">
                            Payment Id
        
                          </th>
                          <th scope="col" className="py-3 px-6">
                            Name
        
                          </th>
                         
                          <th scope="col" className="py-3 px-6">
                            Address
        
                          </th>
            
                          <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            Total Amount
        
                          </th>
                          <th scope="col" className="py-3 px-6">
                            Email
        
                          </th>
                          <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            User Id
        
                          </th>
                          <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            Order Status
        
                          </th>
                          <th scope="col" className="py-3 px-6">
                            Date
        
                          </th>
                        </tr>
                      </thead>
        
                      {/* order related table body */}
                      <tbody>
                        {
                          orders?.length>0 && orders.map((order,index)=>{
                            console.log(order)
                            return(
                              <>
                                              <tr className="bg-white border-b ">
                          <td className="px-6 py-4 font-[500]">
                              <Button  className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#cfcdcd] !text-black"
                            onClick={()=>isShowOrderedProduct(index)}
                            >
                              {
                                showProducts ===index ? <FaAngleDown className="text-[16px] rotate-180 "/>: <FaAngleDown className="text-[16px] "/> 
                              }
                            </Button>
        
                          </td>
                          <td className="px-6 py-4 font-[500] text-primary">
                            {order._id}
        
                          </td>
                          <td className="px-6 py-4 font-[500] text-primary hidden md:table-cell">
                            {order.payment_id?order.payment_id:'CASH ON DELIVERY'} 
        
                          </td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                            {order.name.toUpperCase()} 
        
                          </td>
                        
                          <td className="px-6 py-4 font-[500]">
                            <span className="block w-[400px]">
                              {order.delivery_address?.address_line} {order.delivery_address?.city}    {order.delivery_address?.pincode}  {order.delivery_address?.state}  {order.delivery_address?.country}  {order.delivery_address?.landmark}, {order.delivery_address?.mobile}
        
                            </span>
         
        
                          </td>
                         
                          <td className="px-6 py-4 font-[500]">
        {order.total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            {order.email}	 
        
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <span className="text-primary">
        
        
                           {order.userId}
                            </span>
        
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <Badge status={order.order_status} />
        
                          </td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
         
        
                          </td>
                   
        
                        </tr>
        
                        {
                          showProducts===index && (
                             <tr  >
                          <td colSpan="6" className=" pl-20"  >
                             <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500  rtl:text-right">
                      <thead className="text-xs text-gray-700 bg-gray-50 ">
                        <tr>
                       
                          <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            Product Id
        
                          </th>
                          <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            Product Title
        
                          </th>
                          <th scope="col" className="py-3 px-6">
                            Image
        
                          </th>
                          <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            Quantity
        
                          </th>
                          <th scope="col" className="py-3 px-6">
                            Price
        
                          </th>
                          <th scope="col" className="py-3 px-6">
                            Sub Total
        
                          </th>
                        
                        </tr>
                      </thead>
                      <tbody>
                        {
                          order?.products?.length>0 && order.products.map((product)=>{
                            return(
                                 <tr key={product.productId} className="bg-white border-b ">
                          <td className="px-6 py-4 font-[500] text-gray-700 ">
                            {product.productId}
        
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <div className="w-[200px]">
        
                            {product.name}	 
                            </div>
        
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <img src={product.image[0]} alt="" className="w-[40px] h-[40px] object-cover rounded-md" />
        
                          </td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                            {product.quantity}
        
                          </td>
                          <td className="px-6 py-4 font-[500]">
        {product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <span className="block w-[400px]">
        
        {product.subtotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}                    </span>
         
        
                          </td>
                        
                   
        
                        </tr>
                            )
        
                          })
                        }
                     
                       
                      
                      </tbody>
        
                    </table>
                  </div>
                          </td>
        
                        </tr>
        
                          )
                        }
                   
                              </>
        
                            )
                          })
                        }
        
        
                       
                      </tbody>
        
                    </table>

          </div>
   </div>


{/* chart section */}
      <div className="card my-4 px-4 py-4 shadow-md sm:rounded-lg bg-white">

     
      {/* <LineChart
        width={1000}
        height={500}
        data={chart1Data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3"
        stroke='none'
        />
        <XAxis dataKey="name" tick={{fontSize:12}} />
        <YAxis tick={{fontSize:12}} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="TotalSales" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={3} />
        <Line type="monotone" dataKey="TotalUsers" stroke="#82ca9d" strokeWidth={3} />
      </LineChart> */}

<RevenueChart/>

        </div>

   </> 
  )
}

export default Dashboard
