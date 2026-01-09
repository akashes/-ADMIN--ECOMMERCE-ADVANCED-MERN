import React, { useContext, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoIosClose } from "react-icons/io";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


import { addBannerV1, getBannersV1, getFilterProducts } from "../../features/bannerV1/bannerv1Slice";
import { showError, showSuccess, showWarning } from "../../utils/toastUtils";
import { getCategories } from "../../features/category/categorySlice";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { FcAdvertising } from "react-icons/fc";
const AddBannerV1 = () => {
  //test
  //testing
  const dispatch = useDispatch();
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);
  const { filterProducts } = useSelector((state) => state.bannerV1);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);


  const [formFields, setFormFields] = useState({
    title: "",
    catName: "",
    category: "", //id
    subCat: "", //name
    subCatId: "",
    thirdSubCat: "", //name
    thirdSubCatId: "",
    price: "",
    alignInfo: "",
    product: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleChangeProductCat = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategoryObj = categories.find(
      (cat) => cat._id === selectedCategoryId
    );
    const selectedCategoryName = selectedCategoryObj?.name?.toLowerCase() || "";

    setFormFields((prev) => ({
      ...prev,
      category: selectedCategoryId,
      catName: selectedCategoryName,
      subCat: "",
      subCatId: "",
      thirdSubCat: "",
      thirdSubCatId: "",
    }));
  };

  const handleChangeProductSubCat = (event) => {
    const newSubCatId = event.target.value;

    const subCatName =
      selectedRootCategory?.children
        ?.find((child) => child._id === newSubCatId)
        ?.name?.toLowerCase() || "";

    setFormFields((prev) => ({
      ...prev,
      subCat: subCatName,
      subCatId: newSubCatId,
      thirdSubCat: "",
      thirdSubCatId: "",
    }));
  };

  const handleChangeThirdLevelSubCat = (event) => {
    const newThirdLevelSubCatId = event.target.value;
    const thirdLevelSubCatName =
      thirdLevelCategories
        .find((cat) => cat._id === newThirdLevelSubCatId)
        ?.name?.toLowerCase() || "";

    setFormFields((prev) => ({
      ...prev,
      thirdSubCat: thirdLevelSubCatName,
      thirdSubCatId: newThirdLevelSubCatId,
    }));
  };

  const [image, setImage] = useState(null); //preview
  const [file, setFile] = useState(null);

  function isAdsSizeValid(width, height) {
    const aspectRatio = width / height;
    return (
      width >= 300 &&
      width <= 500 &&
      height >= 200 &&
      height <= 400 &&
      aspectRatio >= 1.4 &&
      aspectRatio <= 1.6
    );
  }

  const handleImageChange = (e) => {
    console.log(e.target.files);
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(selectedFile.type)) {
      showError("Only JPEG, PNG, or WEBP images are allowed");
      return;
    }
    const maxSizeMB = 4;
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      showError(`Image must be less than ${maxSizeMB}MB`);
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(selectedFile);
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const valid = isAdsSizeValid(width, height);
      if (!valid) {
        showWarning("Image ratio is not Valid, Please upload another Image");
        return;
      }
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    };
  };

  // Remove image
  const handleRemoveImage = () => {
    setImage(null);
    setFile(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formFields.title) {
      showWarning("Please Enter a Title");
      return;
    }
    if (!formFields.catName || !formFields.category) {
      showWarning("Category is Required");
      return;
    }
    if (!formFields.price) {
      showWarning("Price is required");
      return;
    }
    if (formFields.alignInfo === "") {
      showWarning("Alignment Detail is needed");
      return;
    }
    if (!file) {
      showWarning("Please Upload Image before Submitting");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", formFields.title);
    formData.append("catName", formFields.catName);
    formData.append("category", formFields.category);
    formData.append("subCat", formFields.subCat);
    formData.append("subCatId", formFields.subCatId);
    formData.append("thirdSubCat", formFields.thirdSubCat);
    formData.append("thirdSubCatId", formFields.thirdSubCatId);
    formData.append("price", formFields.price);
    formData.append("alignInfo", formFields.alignInfo);
    formData.append("product", formFields.product);

    setLoading(true);
    console.log(formData)
    const resultAction = await dispatch(addBannerV1(formData));
    console.log(resultAction);
    if (addBannerV1.fulfilled.match(resultAction)) {
      setLoading(false);
      setFile(null);
      setImage(null);
      setFormFields({
  title: "",
  catName: "",
  category: "",
  subCat: "",
  subCatId: "",
  thirdSubCat: "",
  thirdSubCatId: "",
  price: "",
  alignInfo: "",
  product: "",
});

      showSuccess(
        resultAction.payload.message || "Banner Added successfully"
      );
      setTimeout(() => {
        context.setIsAddProductModalOpen({
          open: false,
          modal: "",
          id: "",
        });
      }, 300);

      navigate("/bannerV1/list");
      dispatch(getBannersV1());
      return
    }
    if (addBannerV1.rejected.match(resultAction)) {
      setLoading(false);
      showError(resultAction.payload || "Failed to Add Banner");
    }
  };

  const selectedRootCategory = categories.find(
    (category) => category._id === formFields.category
  );
  const subCategories = selectedRootCategory?.children || [];
  const selectedSubCategory = subCategories.find(
    (category) => category._id === formFields.subCatId
  );
  const thirdLevelCategories = selectedSubCategory?.children || [];

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
   
      const form = {
        category: formFields.category,
        subCatId: formFields.subCatId,
        thirdSubCatId: formFields.thirdSubCatId,
      };
      dispatch(getFilterProducts(form));
    
  }, [formFields.category, formFields.subCatId, formFields.thirdSubCatId]);


  return (
    <section className=" p-1 md:p-5 lg:px-48 bg-gray-50">
      <form className="addProductForm  p-2 md:p-8 py-3 " onSubmit={handleSubmit}>
        <div className=" overflow-y-scroll pr-0 md:pr-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Advertisement Title
              </h3>
              <input
                type="text"
                name="title"
                id="title"
                className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm text-sm "
                value={formFields.title}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 mb-3 gap-4">
            {categories.length !== 0 && (
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black">
                  {" "}
                  Category
                </h3>
                <Select
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0,0,0,0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0,0,0,0.4)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0,0,0,0.5)",
                      outline: "none",
                    },
                  }}
                  labelId="productCatDropLabel"
                  id="productCatDrop"
                  name="category"
                  value={formFields.category}
                  label="Product Category"
                  size="small"
                  className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
                  onChange={handleChangeProductCat}
                >
                  <MenuItem  value='' >None</MenuItem>


                  {categories &&
                    categories.map((category, index) => (
                      <MenuItem
                        className="!flex !justify-between"
                        key={index}
                        value={category._id}
                      >
                        {category.name}
                        {/* <img src={category.images[0].url} alt="" width={20} /> */}
                      </MenuItem>
                    ))}
                </Select>
              </div>
            )}

            {subCategories.length !== 0 && (
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black">
                  {" "}
                  Sub Category
                </h3>
                <Select
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0,0,0,0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0,0,0,0.4)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0,0,0,0.5)",
                      outline: "none",
                    },
                  }}
                  labelId="productCatDropLabel"
                  disabled={!selectedRootCategory}
                  id="productCatDrop"
                  name="subCatId"
                  value={formFields.subCatId}
                  label="Product Category"
                  size="small"
                  className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
                  onChange={handleChangeProductSubCat}
                >
                  <MenuItem  value='' >None</MenuItem>

                  {subCategories &&
                    subCategories.map((category, index) => (
                      <MenuItem key={index} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                </Select>
              </div>
            )}

            {thirdLevelCategories.length !== 0 && (
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black">
                  Third Sub Category
                </h3>
                <Select
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0,0,0,0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0,0,0,0.4)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0,0,0,0.5)",
                      outline: "none",
                    },
                  }}
                  labelId="productCatDropLabel"
                  disabled={!selectedSubCategory}
                  name="thirdSubCatId"
                  value={formFields.thirdSubCatId}
                  label="Product Category"
                  size="small"
                  className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
                  onChange={handleChangeThirdLevelSubCat}
                >
                  <MenuItem  value='' >None</MenuItem>

                  {thirdLevelCategories &&
                    thirdLevelCategories.map((category, index) => (
                      <MenuItem key={index} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                </Select>
              </div>
            )}
            {filterProducts.length !== 0 && selectedRootCategory && (
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black">
                  {" "}
                  Product
                </h3>
                <Select
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0,0,0,0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0,0,0,0.4)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0,0,0,0.5)",
                      outline: "none",
                    },
                  }}
                  labelId="productCatDropLabel"
                  id="productCatDrop"
                  name="product"
                  value={formFields.product}
                  label="Product Category"
                  size="small"
                  className="w-full border-[rgba(0,0,0,0.1)] focus:!outline-none focus:!border-[rgba(0,0,0,0.5)] "
                  onChange={(e) =>
                    setFormFields((prev) => ({
                      ...prev,
                      product: e.target.value,
                    }))
                  }
                >
                  {filterProducts &&
                    filterProducts.map((product, index) => (
                      <MenuItem
                        className="!flex !justify-between"
                        key={index}
                        value={product._id}
                      >
                        {product.name}
                        {/* <img src={category.images[0].url} alt="" width={20} /> */}
                      </MenuItem>
                    ))}
                </Select>
              </div>
            )}

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black"> Price</h3>
              <input
                type="number"
                name="price"
                id="price"
                className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)]
                     rounded-sm text-sm "
                value={formFields.price}
                onChange={onChangeInput}
              />
            </div>
            <div className="col w-full">
              <h3 className="text-[14px]  font-[500] mb-1 text-black">
                {" "}
                Align Info
              </h3>
              <Select
                className="h-[40px] !min-w-[80px] w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formFields.alignInfo}
                label="Age"
                onChange={(e) =>
                  setFormFields((prev) => ({
                    ...prev,
                    alignInfo: e.target.value,
                  }))
                }
              >
                <MenuItem value={"right"}>Right</MenuItem>
                <MenuItem value={"left"}>Left</MenuItem>
              </Select>
            </div>
          </div>

          <hr className="mt-5 !text-gray-400" />

          {/* media and image section */}
          <div className="col w-full p-5 px-0">
            <h3 className="font-[700] text-[18px] mb-3">Image</h3>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2 md:gap-4 ">
              {image && (
                <div className="uploadBoxWrapper relative">
                  <span className="absolute w-[20px] h-[20px] opacity-90 rounded-full overflow-hidden bg-primary top-[-5px] right-[-5px] cursor-pointer flex items-center justify-center z-50">
                    <IoIosClose
                      onClick={handleRemoveImage}
                      className="text-white text-[19px]"
                    />
                  </span>

                  <div className="uploadBox p-0 rounded-md  overflow-hidden border-2 border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors flex flex-col justify-center items-center relative">
                    <LazyLoadImage
                      className="w-full h-full object-cover"
                      effect="blur"
                      wrapperProps={{
                        style: { transitionDelay: "1s" },
                      }}
                      alt={"image"}
                      src={image}
                    />
                  </div>
                </div>
              )}

              <UploadBox
                multiple={false}
                isUploading={isUploading}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
        <hr className="text-gray-400" />
        <br />
        <Button
          disabled={isUploading || loading}
          type="submit"
          className="!border-1 !border-blue-700 md:btn-lg mt-3 w-full gap-1"
        >
          {loading ? (
            <>
              <CircularProgress className="!text-black" size={20} />
              <span className="text-blue-800" >Adding Advertisement...</span>
            </>
          ) : (
            <>
              <FcAdvertising className="text-[25px] text-white" />
              Add Advertisement
            </>
          )}
        </Button>
      </form>
    </section>
  );
};

export default AddBannerV1;
