import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button, Rating, CardActionArea } from '@mui/material';
import styles from './ProductCard.module.scss'; 
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Actions/CartActions';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (id, quantity) => {
    
    dispatch(addToCart({id, quantity}));
    console.log("btnclicked")
    console.log('Adding to cart:', id, quantity);
  }

  return (
    <Card className={styles.card}>
      <Link
        className="productCard"
        to={`/product/${product._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardActionArea>
          <CardMedia className={styles.media} image={product.images[0]?.url} />
          <CardContent>
            <Typography
              gutterBottom
              color="black"
              fontWeight="bold"
              style={{ fontWeight: "700" }}
            >
              {product.name}
            </Typography>
            <Box display="flex" alignItems="center">
              <Rating
                name="rating"
                value={product.ratings}
                precision={0.1}
                readOnly
                size="small"
                style={{ color: "#ed1c24", marginRight: 8, fontWeight: "400" }}
              />
              <Typography variant="body2" color="textSecondary">
                ({product.numOfReviews})
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              component="div"
              className={styles.description}
            >
              {product.description}
            </Typography>
            <Box display="flex" alignItems="center" gap="10px" >
              {/* <Typography variant="body1" className={styles.oldPrice}>
                {product.price}
              </Typography> */}
              <Typography variant="body1" className={styles.finalPrice}>
                ${product.price}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
      <Box display="flex" justifyContent="center" p={2}>
        <Button
          variant="contained"
          className={styles.cardbutton}
          onClick={() => handleAddToCart(product._id, 1)}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
