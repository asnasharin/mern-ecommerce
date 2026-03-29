import React, { useEffect } from 'react';
import Banner from './Banner';
import ProductCard from './ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Actions/productAction';
import { clearErrors } from '../../Reducers/ProductReducer';
import styles from './Home.module.scss';

function Home() {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.products.user);

  useEffect(() => {
    console.log("products card", products);
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  const limitedProducts = products?.slice(0, 7);

  return (
    <div>
      <Banner />
      
      <div className={styles.mid_image}>
        <img src="/Image/midimage.png" alt="Special Offer" />
      </div>

      <h2 className={styles.trending_heading}>Trending Products</h2>

      <div className={styles.trending_products}>
        {limitedProducts &&
          limitedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>

      <div className={styles.square_image}>
        <img src="/Image/squareimg.png" alt="New Arrival" />
      </div>

      <div className={styles.bottom_banner}>
        <img
          src="/Image/bottombanner.png"
          alt="Exclusive Offer"
        />
      </div>
    </div>
  );
}

export default Home;
