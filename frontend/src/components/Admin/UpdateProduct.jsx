import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, FormControl, Select, TextField, Typography, InputAdornment, MenuItem } from '@mui/material';
import { Edit as EditIcon, ShoppingCartOutlined as ShoppingCartOutlinedIcon, AttachMoney as AttachMoneyIcon, Storage as StorageIcon, Info as InfoIcon, Description as DescriptionIcon, CloudUpload as CloudUploadIcon, Collections as CollectionsIcon } from '@mui/icons-material';
import SideBar from './SideBar';
import styles from "./NewProduct.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updateProduct, getProductDetails } from "../../Actions/productAction"
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const { products,loading, error, success } = useSelector((state) => state.products.admin);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([])
  const fileInputRef = useRef();

  const categories = [
    "women",
    "men",
    "kids",
    "footwear"
  ];

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (products) {
      setProductName(products.name);
      setPrice(products.price);
      setStock(products.stock);
      setCategory(products.category);
      setDescription(products.description);
      setOldImages(products.images)   
    }
  }, [products]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }

  const handleImageUpload = () => {
    fileInputRef.current.click();
  }

  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prev) => [...prev, reader.result]);
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
        name: productName,
        price,
        stock,
        category,
        description,
        images: images.map(img => img.url) 
    };

    dispatch(updateProduct({ id, productData: updatedProduct }));

    navigate('/admin/dashboard');
};

return (
    <div className={styles.updateProduct}>
      <SideBar />
      <div className={styles.secondBox1}>
        <div className={styles.formContainer}>
          <form className={styles.form} encType="multipart/form-data" onSubmit={handleSubmit}>
            <Avatar className={styles.avatar}>
              <EditIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className={styles.heading}>
              Update Product
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

            
             {imagesPreview.length > 0 ? (
                      <Box className={styles.imageArea}>
                        {imagesPreview &&
                          imagesPreview.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt="Product Preview"
                              className={styles.image}
                            />
                          ))}
                      </Box>
                    ) : (
                      <Box className={styles.imageArea}>
                        {oldImages &&
                          oldImages.map((image, index) => (
                            <img
                              key={index}
                              src={image?.url}
                              alt="Old Product Preview"
                              className={styles.image}
                            />
                          ))}
                      </Box>
                    )} 

            <Button
              variant="contained"
              fullWidth
              type="submit"
              className={styles.submitButton}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
