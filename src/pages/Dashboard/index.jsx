import React, { useContext, useEffect, useState } from 'react'
import DashboardBoxes from '../../components/DashboardBoxes'
import { Button, Pagination } from '@mui/material'
import { FaAngleDown } from 'react-icons/fa6'
import Badge from '../../components/Badge'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'
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

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MyContext } from '../../App'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../features/category/categorySlice'
import AlertBox from '../../components/AlertBox'
import { CircularProgress, Rating } from '@mui/material';
import useDebounce from '../../hooks/useDebounce'
import { deleteMultipleProducts, deleteProduct, getAllProducts, setProductAdded } from '../../features/product/productSlice'
import SearchBox from '../../components/SearchBox'



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
    const{products,totalProducts,totalPages,currentPage,productAdded,loading}=useSelector(state=>state.product)
  const{categories}=useSelector(state=>state.category)
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


  const[chart1Data,setChart1Data]=useState(
    [
  {
    name: 'JAN',
    TotalSales: 4000,
    TotalUsers: 2400,
    amt: 2400,
  },
  {
    name: 'FEB',
    TotalSales: 3000,
    TotalUsers: 1398,
    amt: 2210,
  },
  {
    name: 'MAR',
    TotalSales: 2000,
    TotalUsers: 9800,
    amt: 2290,
  },
  {
    name: 'APR',
    TotalSales: 2780,
    TotalUsers: 3908,
    amt: 2000,
  },
  {
    name: 'MAY',
    TotalSales: 1890,
    TotalUsers: 4800,
    amt: 2181,
  },
  {
    name: 'JUN',
    TotalSales: 2390,
    TotalUsers: 3800,
    amt: 2500,
  },
  {
    name: 'JUL',
    TotalSales: 3490,
    TotalUsers: 4300,
    amt: 2100,
  },
]
  )

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
  return (
   <>
   {/* gretting container with cta button */}
   <div className='w-full border py-2 p-5 bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md'>
    <div className='info'>
      <h1 className='text-[35px] font-bold leading-12 mb-3 '>Welcome, <br /> Akash   <svg
          style={{ display: 'inline', verticalAlign: 'top' }} // This is important

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
      <p>Here’s What happening on your store today. See the statistics at once.</p>
      <br />
       <Button className='btn-blue flex gap-2 !capitalize group'
       onClick={()=>context.setIsAddProductModalOpen({open:true,modal:'Add Product'})}
       >
        <img src="/ecommerce.png" alt="" className='w-[30px] group-hover:scale-105' />
        Add Product
       </Button>
    </div>
    <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1753076866/shop-illustration_lpdjyl.webp" alt="" className='w-[250px]' />

   </div>
   <DashboardBoxes/>

 


{/* testing - products mui table*/}
   <>
   {/* welcome banner */}
     <div className="flex items-center justify-between px-2 py-0 mt-3">
      <h2 className='text-[18px] font-[600]'>Products(Material ui  table)</h2>
        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
          {
         
            deleteArray.length>0 &&   <Button  onClick={confirmDeleteMultiple} className='btn !bg-red-600 !text-white btn-sm'>Delete</Button>
          }
          <Button className='btn-blue btn-sm '
                onClick={()=>context.setIsAddProductModalOpen({open:true,modal:'Add Product'})}

          > Add Product</Button>

        </div>
    </div>
   <div className="card my-4 shadow-md sm:rounded-lg bg-white pt-5">
  
      <div className="flex items-center w-full px-5 justify-between gap-4">
        
                    <div className="col w-[15%]">
          <h4 className='font-[600] text-[13px] mb-2' >Category</h4>
            <Select
            disabled={categories.length===0}
            style={{zoom:'80%'}}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={formFields.category}
          label="Category"
          className='w-full '
          size='small'
          onChange={handleChangeProductCat}

        >
          <MenuItem value=''>None</MenuItem>


          {
            categories.map((category)=>(
          <MenuItem value={category._id}>{category.name}</MenuItem>


            ))
          }
    
        </Select>
        
        </div>
      

        <div className="col w-[15%]">
          <h4 className='font-[600] text-[13px] mb-2' >Sub Category</h4>
            <Select
            disabled={formFields.category==='' || subCategories.length===0}
            style={{zoom:'80%'}}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={formFields.subCatId}
          onChange={handleChangeProductSubCat}
          label="Category"
          className='w-full '
          size='small'
        >
          <MenuItem value=''>None</MenuItem>

          {
            subCategories.length>0 && subCategories.map((subCategory)=>(

              <MenuItem value={subCategory._id}>{subCategory.name}</MenuItem>
            ))
          }
       
          
        </Select>
        
        </div>
        <div className="col w-[15%]">
          <h4 className='font-[600] text-[13px] mb-2' >Third level Category</h4>
            <Select
            disabled={formFields.category==='' || formFields.subCat==='' || thirdLevelCategories.length===0}
            style={{zoom:'80%'}}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={formFields.thirdSubCatId}
          onChange={handleChangeThirdLevelSubCat}
          label="Category"
          className='w-full '
          size='small'
        >
          <MenuItem value=''>None</MenuItem>

          {
            thirdLevelCategories?.length>0 && thirdLevelCategories.map((thirdLevelCategory)=>(
              
              <MenuItem value={thirdLevelCategory._id}>{thirdLevelCategory.name}</MenuItem>
            ))
          }
      
     
        </Select>
        
        </div>
<div className="col w-[15%]">
  <h4 className='font-[600] text-[13px] mb-2'>Min Rating</h4>
  <Rating
    value={ratingFilter}
    precision={1}
    onChange={(event, newValue) => setRatingFilter(newValue)}
  />
</div>

        <div className="col w-[20%] ml-auto flex gap-3">
              <SearchBox value={searchTerm} onChange={handleSearchChange}/>
               <Button 
               className='!min-w-[150px]'
    variant="outlined"
    color="error"
    size="small"
    onClick={handleClearAllFilters}
  >
    Clear Filters
  </Button>


        </div>
  

      
      </div>
      <br />

    <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
            {/* <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
              {
                columns.map((column)=>{
                  const value=row(column.id)
                  return(
                    <TableCell key={column.id} align={column.align} >
                      {column.format && typeof value==='number' ? column.format(value):value}
                    </TableCell>
                  )
                })
              }

            </TableRow> */}
            {
              loading && 
              <TableRow>
                <TableCell colSpan={7}>
              <div className='flex items-center justify-center w-full min-h-[400px]'>


                <CircularProgress/>
                </div>

                </TableCell>
              </TableRow>

              
            }
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
         !loading &&  products.length>0 &&  products?.map((product)=>(

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
      </TableContainer>
       <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />



        

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
   <div className="card my-4 shadow-md sm:rounded-lg bg-white">
    <div className="flex items-center justify-between px-3 py-5">
      <h2 className='text-[18px] font-[600]'>Recent Orders</h2>
    </div>

     <div className="relative overflow-x-auto mt-5 pb-5">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
  {/* order related heading */}
  <thead className="text-xs text-gray-700 bg-gray-50">
    <tr>
      <th scope="col" className="py-3 px-6">&nbsp;</th>
      <th scope="col" className="py-3 px-6 whitespace-nowrap">Order Id</th>
      <th scope="col" className="py-3 px-6 whitespace-nowrap">Payment Id</th>
      <th scope="col" className="py-3 px-6">Name</th>
      <th scope="col" className="py-3 px-6 whitespace-nowrap">Phone No.</th>
      <th scope="col" className="py-3 px-6">Address</th>
      <th scope="col" className="py-3 px-6">PinCode</th>
      <th scope="col" className="py-3 px-6 whitespace-nowrap">Total Amount</th>
      <th scope="col" className="py-3 px-6">Email</th>
      <th scope="col" className="py-3 px-6 whitespace-nowrap">User Id</th>
      <th scope="col" className="py-3 px-6 whitespace-nowrap">Order Status</th>
      <th scope="col" className="py-3 px-6">Date</th>
    </tr>
  </thead>

  <tbody>
    {/* Order Row */}
    <tr className="bg-white  border-[#f1f1f1] border-b border-[#f1f1f1]-[#f1f1f1]">
      <td className="px-6 py-4 font-[500]">
        <Button
          className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#cfcdcd] !text-black"
          onClick={() => isShowOrderedProduct(0)}
        >
          {showProducts === 0 ? (
            <FaAngleDown className="text-[16px] rotate-180" />
          ) : (
            <FaAngleDown className="text-[16px]" />
          )}
        </Button>
      </td>
      <td className="px-6 py-4 font-[500] text-secondary">687cd457228db479bb93f3a6</td>
      <td className="px-6 py-4 font-[500] text-secondary">pay_QvJ5dNv8zOsr68</td>
      <td className="px-6 py-4 font-[500] whitespace-nowrap">Akash</td>
      <td className="px-6 py-4 font-[500]">913434455676</td>
      <td className="px-6 py-4 font-[500]"><span className="block w-[400px]">sdaf asdf erwt asdf asdfasdf</span></td>
      <td className="px-6 py-4 font-[500]">344355</td>
      <td className="px-6 py-4 font-[500]">1850</td>
      <td className="px-6 py-4 font-[500]">akashes5753279@gmail.com</td>
      <td className="px-6 py-4 font-[500]"><span className="text-secondary">6864d038228db479bb77c9a5</span></td>
      <td className="px-6 py-4 font-[500]"><Badge status="confirm" /></td>
      <td className="px-6 py-4 font-[500] whitespace-nowrap">2025-07-20</td>
    </tr>

    {/* Expandable Product Details */}
    {showProducts === 0 && (
      <tr>
        <td colSpan="6" className="pl-20">
          <div className="relative overflow-x-auto recentProductsTable ">
            <table className="w-full  text-sm text-left text-gray-500 rtl:text-right">
              <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                  <th className="py-3 px-6 whitespace-nowrap">Product Id</th>
                  <th className="py-3 px-6 whitespace-nowrap">Product Title</th>
                  <th className="py-3 px-6">Image</th>
                  <th className="py-3 px-6 whitespace-nowrap">Quantity</th>
                  <th className="py-3 px-6">Price</th>
                  <th className="py-3 px-6">Sub Total</th>
                </tr>
              </thead>
              <tbody>
                {/* to create two rows */}
                {[1, 2].map((_, i) => (
                  <tr key={i} className="bg-white border-b border-b-[#f1f1f1]">
                    <td className="px-6 py-4 font-[500] text-gray-700">123456789</td>
                    <td className="px-6 py-4 font-[500]">Product Title</td>
                    <td className="px-6 py-4 font-[500]">
                      <img
                        src="https://serviceapi.spicezgold.com/download/1742452458052_gemini-refined-sunflower-oil-1-l-product-images-o490012719-p490012719-0-202308301722.webp"
                        alt=""
                        className="w-[40px] h-[40px] object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 font-[500] whitespace-nowrap">2</td>
                    <td className="px-6 py-4 font-[500]">133</td>
                    <td className="px-6 py-4 font-[500]"><span className="block w-[400px]">675</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    )}

    {/* Another Order (Duplicate Data Just for Structure) */}
    <tr className="bg-white border-b border-b-[#f1f1f1]">
      <td className="px-6 py-4 font-[500]">
        <Button
          className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#cfcdcd] !text-black"
          onClick={() => isShowOrderedProduct(1)}
        >
          {showProducts === 1 ? (
            <FaAngleDown className="text-[16px] rotate-180" />
          ) : (
            <FaAngleDown className="text-[16px]" />
          )}
        </Button>
      </td>
      <td className="px-6 py-4 font-[500] text-secondary">687cd457228db479bb93f3a6</td>
      <td className="px-6 py-4 font-[500] text-secondary">pay_QvJ5dNv8zOsr68</td>
      <td className="px-6 py-4 font-[500] whitespace-nowrap">Akash</td>
      <td className="px-6 py-4 font-[500]">913434455676</td>
      <td className="px-6 py-4 font-[500]"><span className="block w-[400px]">sdaf asdf erwt asdf asdfasdf</span></td>
      <td className="px-6 py-4 font-[500]">344355</td>
      <td className="px-6 py-4 font-[500]">1850</td>
      <td className="px-6 py-4 font-[500]">akashes5753279@gmail.com</td>
      <td className="px-6 py-4 font-[500]"><span className="text-secondary">6864d038228db479bb77c9a5</span></td>
      <td className="px-6 py-4 font-[500]"><Badge status="confirm" /></td>
      <td className="px-6 py-4 font-[500] whitespace-nowrap">2025-07-20</td>
    </tr>

    {showProducts === 1 && (
      <tr>
        <td colSpan="6" className="pl-20">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
              <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                  <th className="py-3 px-6 whitespace-nowrap">Product Id</th>
                  <th className="py-3 px-6 whitespace-nowrap">Product Title</th>
                  <th className="py-3 px-6">Image</th>
                  <th className="py-3 px-6 whitespace-nowrap">Quantity</th>
                  <th className="py-3 px-6">Price</th>
                  <th className="py-3 px-6">Sub Total</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2].map((_, i) => (
                  <tr key={i} className="bg-white border-b">
                    <td className="px-6 py-4 font-[500] text-gray-700">123456789</td>
                    <td className="px-6 py-4 font-[500]">Product Title</td>
                    <td className="px-6 py-4 font-[500]">
                      <img
                        src="https://serviceapi.spicezgold.com/download/1742452458052_gemini-refined-sunflower-oil-1-l-product-images-o490012719-p490012719-0-202308301722.webp"
                        alt=""
                        className="w-[40px] h-[40px] object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 font-[500] whitespace-nowrap">2</td>
                    <td className="px-6 py-4 font-[500]">133</td>
                    <td className="px-6 py-4 font-[500]"><span className="block w-[400px]">675</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    )}
  </tbody>
</table>

          </div>
   </div>
{/* chart section */}
      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className='flex items-center justify-between px-5 py-5 pb-0 '>
          <h2 className='text-[18px] font-[700]'>
            Total Users & Total Sales

             </h2>

        </div>
        <div className='flex items-center justify-start px-5 py-5 pt-0 gap-3 '>
          <span className='flex items-center gap-1 text-[15px]'>
            <span className='block bg-green-500 rounded-full w-[10px] h-[10px] '></span>
            Total Users
          </span>
          <span className='flex items-center gap-1 text-[15px]'>
            <span className='block bg-secondary rounded-full w-[10px] h-[10px] '></span>
            Total Sales
          </span>

        </div>
      <LineChart
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
      </LineChart>
        </div>

   </> 
  )
}

export default Dashboard
