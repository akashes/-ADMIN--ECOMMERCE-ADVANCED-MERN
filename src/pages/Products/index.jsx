import  Button  from '@mui/material/Button'
import React, { useContext, useEffect, useState } from 'react'

import { IoIosAdd } from "react-icons/io";

import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TooltipMUI from '@mui/material/Tooltip';


import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";



import { AiFillEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SearchBox from '../../components/SearchBox';





import { MyContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMultipleProducts, deleteProduct, getAllProducts, setProductAdded } from '../../features/product/productSlice';
import { showError, showSuccess } from '../../utils/toastUtils';

import './products.css'
import { getCategories } from '../../features/category/categorySlice';
import useDebounce from '../../hooks/useDebounce';
import { CircularProgress, Rating } from '@mui/material';
import AlertBox from '../../components/AlertBox';
import ProductsSkeleton from '../../components/Skeltons/ProductsSkelton';


const columns=[
  {id:'product',label:'PRODUCT',minWidth:150},
  {id:'category',label:'CATEGORY',minWidth:100},
  {id:'subcategory',label:'SUB CATEGORY',minWidth:150},
  {id:'price',label:'PRICE',minWidth:100},
  {id:"sales",label:'SALES',minWidth:130},
  {id:"rating",label:'RATING',minWidth:130},
  {id:'action',label:'ACTION',minWidth:120}
]


const Products = () => {
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
        const [categoryFilterVal, setCategoryFilterVal] = useState('');
        const [isFeaturedFilter, setIsFeaturedFilter] = useState('');

        console.log(isFeaturedFilter)
    
          const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
      const handleChangeCatFilter = (event) => {
        setCategoryFilterVal(event.target.value);
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
  setIsFeaturedFilter('')
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
    if (isFeaturedFilter !== '') {
  params.isFeatured = isFeaturedFilter === 'true';
}


  const fetchProductData=async()=>{
    console.log(page,rowsPerPage)
     dispatch(getAllProducts(params))
  }
  fetchProductData()

},[dispatch,page,rowsPerPage,productAdded,formFields,debouncedSearchTerm,ratingFilter,isFeaturedFilter])

useEffect(()=>{

  dispatch(getCategories())
},[])
useEffect(() => {
  setPage(0);
}, [ratingFilter,isFeaturedFilter]);

const selectedRootCategory = categories.find((category) => category._id === formFields.category);
const subCategories = selectedRootCategory?.children || [];
const selectedSubCategory = subCategories.find((category) => category._id === formFields.subCatId);
const thirdLevelCategories = selectedSubCategory?.children || [];
  return (
   <>
   {/* welcome banner */}
 <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-0 mt-3">
  <h2 className="text-[18px] font-[600]">Products List</h2>
  <div className="flex flex-wrap gap-2">
    {deleteArray.length > 0 && (
      <Button onClick={confirmDeleteMultiple} className="btn !bg-red-600 !text-white btn-sm">
        Delete
      </Button>
    )}
    <Button
      className="btn-blue btn-sm"
      onClick={() => context.setIsAddProductModalOpen({ open: true, modal: "Add Product" })}
    >
      Add Product
    </Button>
  </div>
</div>
   <div className="card my-4 shadow-md sm:rounded-lg bg-white pt-5 mb-10">
  
      <div className="flex flex-wrap items-center w-full px-5 justify-between gap-3">
        
             <div className="w-full sm:w-[48%] md:w-[23%] lg:w-[20%]">
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
    <div className="w-full sm:w-[48%] md:w-[23%] lg:w-[20%]">
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
    <div className="w-full sm:w-[48%] md:w-[23%] lg:w-[20%]">
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




        <div className="w-full sm:w-[48%] md:w-[23%] lg:w-[20%]">
  <h4 className='font-[600] text-[13px] mb-2'>Featured</h4>
  <Select
    value={isFeaturedFilter}
    onChange={(e) => setIsFeaturedFilter(e.target.value)}
    size="small"
    style={{ zoom: '80%' }}
    className="w-full"
  >
    <MenuItem value=''>All</MenuItem>
    <MenuItem value='true'>Featured</MenuItem>
    <MenuItem value='false'>Not Featured</MenuItem>
  </Select>
</div>

    


       

           {/* Rating */}
            <div className="w-full sm:w-[48%] md:w-[23%] lg:w-[20%]">
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
              loading && 
            <ProductsSkeleton/>

              
            }
            {
              !loading && products.length>0 &&
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
            }
      
      </TableContainer>
      {
        !loading && products?.length>0 &&
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
  )
}

export default Products
