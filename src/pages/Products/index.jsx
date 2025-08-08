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

import ProgressBar from '../../components/ProgressBar'

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";



import { AiFillEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SearchBox from '../../components/SearchBox';



import { MyContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, setProductAdded } from '../../features/product/productSlice';



const columns=[
  {id:'product',label:'PRODUCT',minWidth:150},
  {id:'category',label:'CATEGORY',minWidth:100},
  {id:'subcategory',label:'SUB CATEGORY',minWidth:150},
  {id:'price',label:'PRICE',minWidth:100},
  {id:"sales",label:'SALES',minWidth:130},
  {id:'action',label:'ACTION',minWidth:120}
]


const Products = () => {
  const{products,totalProducts,totalPages,currentPage,productAdded}=useSelector(state=>state.product)
    const context = useContext(MyContext)
    const dispatch = useDispatch()
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const [page, setPage] = React.useState(0);
        const [categoryFilterVal, setCategoryFilterVal] = useState('');
    
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


      useEffect(()=>{

        if(productAdded){
          dispatch(getAllProducts({page:page+1,perPage:rowsPerPage}))
          setProductAdded(false)
        }
  const fetchProductData=async()=>{
    console.log(page,rowsPerPage)
    await dispatch(getAllProducts({page:page+1,perPage:rowsPerPage}))
  }
  fetchProductData()

},[dispatch,page,rowsPerPage,productAdded])


  return (
   <>
   {/* welcome banner */}
     <div className="flex items-center justify-between px-2 py-0 mt-3">
      <h2 className='text-[18px] font-[600]'>Products(Material ui  table)</h2>
        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
          <Button className='btn !bg-green-600 !text-white btn-sm'>Export</Button>
          <Button className='btn-blue btn-sm '
                onClick={()=>context.setIsAddProductModalOpen({open:true,modal:'Add Product'})}

          > Add Product</Button>

        </div>
    </div>
   <div className="card my-4 shadow-md sm:rounded-lg bg-white pt-5">
  
      <div className="flex items-center w-full px-5 justify-between ">
        <div className="col w-[20%]">
          <h4 className='font-[600] text-[13px] mb-2' >Category By</h4>
            <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={categoryFilterVal}
          onChange={handleChangeCatFilter}
          label="Category"
          className='w-full '
          size='small'
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Men</MenuItem>
          <MenuItem value={20}>Women</MenuItem>
          <MenuItem value={30}>Kids</MenuItem>
        </Select>
        
        </div>
        <div className="col w-[20%] ml-auto">
              <SearchBox/>

        </div>
      
      </div>
      <br />

    <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className='bg-[#f1f1f1]'>
            <TableRow>
              <TableCell>
                <Checkbox {...label} size='small'/>
                
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
           products.length>0 && products.map((product)=>(

                <TableRow key={product._id} >
              <TableCell style={{minWidth:columns.minWidth}}>
                <Checkbox {...label} size='small'/>

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
                   <div className="flex items-center gap-1">
      <TooltipMUI placement='top' title='Edit Product'>

      <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !min-w-[35px]  !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'>

        <AiFillEdit className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
      </Button>

      
      </TooltipMUI>
      <TooltipMUI placement='top' title='View Product details'>

      <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !min-w-[35px]  !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'>

        <FaEye className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
      </Button>
      </TooltipMUI>
      <TooltipMUI placement='top' title='Remove Product'>

      <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !min-w-[35px]  !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] hover:!shadow-sm hover:scale-110'>

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
        count={totalProducts||0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />



        

   </div> 
   </>
  )
}

export default Products
