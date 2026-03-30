import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import Star from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { clearErrors, getAllReviews, deleteReview } from '../../Actions/productAction';
import styles from './ProductReviews.module.scss'; 

function ProductReviews() {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState('');

  const { reviews , loading, error } = useSelector((state) => state.products.productDetails);
  const { success: deleteSuccess, error: deleteError } = useSelector((state) => state.products.admin);

  const rows = Array.isArray(reviews) ? reviews.map((review) => ({
    id: review._id,
    user: review.name || 'Anonymous', 
    recommended: review.recommended,
    rating: review.ratings,
})) : [];


  // Columns definition for DataGrid
  const columns = [
    { field: 'id', headerName: 'Review ID', minWidth: 200, flex: 1 },
    { field: 'user', headerName: 'User', minWidth: 150, flex: 1 },
    { field: 'recommended', headerName: 'recommended', minWidth: 250, flex: 2 },
    { field: 'rating', headerName: 'Rating', type: 'number', minWidth: 100, flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params) => (
        <IconButton aria-label="delete" onClick={() => deleteReviewHandler(params.id)}>
          <DeleteIcon style={{ color: 'red' }} />
        </IconButton>
      ),
      minWidth: 150,
      flex: 1,
    },
  ];

  // Fetch all reviews based on productId
  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    if (productId.trim()) {
      dispatch(getAllReviews(productId)); 
    }
  };

  // Handle review deletion
  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview({ productId, reviewId })); 
    getAllReviews();
  };

  useEffect(() => {
    if (error || deleteError) {
      dispatch(clearErrors());
    }
    if (deleteSuccess) {
      alert('Review deleted successfully');
      dispatch(getAllReviews(productId));
    }
  }, [dispatch, error, deleteError, deleteSuccess, productId]);

  return (
    <div className={styles.secondBox_0}>
      <div className={styles.formSection}>
        <form className={styles.form} onSubmit={productReviewsSubmitHandler}>
          <Avatar className={styles.avatar}>
            <StarRateIcon />
          </Avatar>
          <Typography variant="h5" component="h1" className={styles.heading}>
            All Reviews
          </Typography>

          <TextField
            variant="outlined"
            fullWidth
            className={`${styles.nameInput} ${styles.textField}`}
            label="Product Id"
            required
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Star style={{ fontSize: 20, color: "#414141" }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            id="createProductBtn"
            type="submit"
            fullWidth
            variant="contained"
            className={styles.loginButton}
            disabled={loading || !productId.trim()}
          >
            Search
          </Button>
        </form>

        {reviews && reviews.length > 0 ? (
          <div className={styles.productListContainer}>
            <h4 className={styles.productListHeading}>All Reviews</h4>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              autoHeight
              disableSelectionOnClick
              className={styles.productListTable}
            />
          </div>
        ) : (
          <h1 className={styles.heading_02}>No Reviews Found</h1>
        )}
      </div>
    </div>
  );
}

export default ProductReviews;
