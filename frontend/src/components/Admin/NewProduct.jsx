import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, FormControl, Select, TextField, Typography, InputAdornment, MenuItem } from '@mui/material';
import { AddCircleOutline as AddCircleOutlineIcon, ShoppingCartOutlined as ShoppingCartOutlinedIcon, AttachMoney as AttachMoneyIcon, Storage as StorageIcon, Info as InfoIcon, Description as DescriptionIcon, CloudUpload as CloudUploadIcon, Collections as CollectionsIcon } from '@mui/icons-material';
import SideBar from './SideBar';
import styles from "./NewProduct.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createProduct } from "../../Actions/productAction"
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.products.admin)

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [productinfo, setProductInfo] = useState("");
  const [category, setCategory] = useState("");
  const [isCategory, setIsCategory] = useState(false)
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const fileInputRef = useRef();

  const categories = [
    "woemn",
    "men",
    "kids",
    "footewar"
  ];

  useEffect(() => {
    if(error) {
      alert("error");
      dispatch(clearErrors());
    }
     if(success) {
      // alert("product created");
     }
  }, [dispatch, loading, error, navigate, success]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategory(true);
  }

  const handleImageUpload = () => {
    fileInputRef.current.click();
  }
  

  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  

  const handleSubmit = (e) => {
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("name", productName);
      myForm.set("price", price);
      myForm.set("description", description);
      myForm.set("category", category);
      myForm.set("stock", stock);
      myForm.set("info", productinfo);
      images.forEach((currImg) => {
        myForm.append("images", currImg);
      });
      dispatch(createProduct(myForm));

      setProductName("");
  setPrice(0);
  setStock(0);
  setProductInfo("");
  setCategory("");
  setDescription("");
  setImages([]);
  setImagesPreview([]);
    };
  
  return (
    <div className={styles.updateProduct}>
      <SideBar />
      <div className={styles.secondBox1}>
        <div className={styles.formContainer}>
          <form className={styles.form} encType="multipart/form-data" onSubmit={handleSubmit}>
            <Avatar className={styles.avatar}>
              <AddCircleOutlineIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className={styles.heading}>
              Create Product
            </Typography>

            <TextField
              variant="outlined"
              fullWidth
              label="Product Name"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className={styles.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ShoppingCartOutlinedIcon className={styles.icon} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              variant="outlined"
              label="Price"
              required
              fullWidth
              className={styles.textField}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AttachMoneyIcon className={styles.icon} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              variant="outlined"
              label="Stock"
              required
              fullWidth
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className={styles.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <StorageIcon className={styles.icon} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              variant="outlined"
              label="Product Info"
              required
              fullWidth
              value={productinfo}
              onChange={(e) => setProductInfo(e.target.value)}
              className={styles.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <InfoIcon className={styles.icon} />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl fullWidth variant="outlined" className={styles.formControl}>
              <Typography variant="body2" className={styles.labelText}>
                Choose Category
              </Typography>
              <Select
                className={styles.select}
                value={category}
                onChange={handleCategoryChange}
                inputProps={{ name: "category", id: "category-select" }}
                MenuProps={{
                  classes: { paper: styles.menu },
                  anchorOrigin: { vertical: "bottom", horizontal: "left" },
                  transformOrigin: { vertical: "top", horizontal: "left" },
                  getContentAnchorEl: null,
                }}
              >
                {categories.map((cate) => (
                  <MenuItem key={cate} value={cate}>
                    {cate}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              fullWidth
              label="Product Description"
              multiline
              rows={1}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <DescriptionIcon className={styles.icon} />
                  </InputAdornment>
                ),
              }}
            />

            <div className={styles.imageUpload}>
              <CollectionsIcon fontSize="large" className={styles.imgIcon} />
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                id="image-upload"
                ref={fileInputRef}
                onChange={createProductImageChange}
              />
              <label htmlFor="image-upload">
                <Button variant="contained" onClick={handleImageUpload} className={styles.uploadButton} startIcon={<CloudUploadIcon />}>
                  Upload Images
                </Button>
              </label>
            </div>

            <Box className={styles.imagePreview}>
              {/* Display uploaded images here */}
              {imagesPreview.map((image, index) => (
                <img src={image} key={index} alt="Product Preview" className={styles.image} />
              ))}
            </Box>

            <Button
              variant="contained"
              fullWidth
              type="submit"
              className={styles.submitButton}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
