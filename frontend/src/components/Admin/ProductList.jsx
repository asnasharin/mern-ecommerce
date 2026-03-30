import React, { useEffect } from 'react';
import './ProductList.module.scss';
import SideBar from './SideBar';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, DeleteProduct, getAdminProducts } from '../../Actions/productAction';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from 'react-router-dom';
import styles from './ProductList.module.scss';

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products.admin);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch, error]); 

  if (loading) return <p>Loading ....</p>;
  if (error) return <p>Error: {error.message || 'Something went wrong'}</p>;

  const deleteProductHandler = (id) => {
    dispatch(DeleteProduct(id));
    window.location.reload();
  };

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 230,
      flex: 0.5,
      headerClassName: "column-header",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
      margin: "0 auto", 
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.5,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 200,
      flex: 0.5,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      minWidth: 230,
      headerClassName: "column-header1",
      renderCell: (params) => {
        const productId = params.row.id;

        return (
          <>
            <Link
              to={`/admin/product/${productId}`}
              style={{ marginLeft: "1rem" }}
            >
              <EditIcon className={styles.iconbtn} />
            </Link>
              <DeleteIcon 
              onClick={() => deleteProductHandler(productId)}
              style={{ cursor: 'pointer', marginLeft: "1rem" }}
              className={styles.iconbtn} />
          </>
        );
      },
    },
  ];

  const rows = products.data ? products.data.map(item => ({
    id: item._id,
    stock: item.stock,
    price: item.price,
    name: item.name,
  })) : [];

  return (
    <div className={styles.productList} style={{ marginTop: 0 }}>
      <div className={styles.listSidebar}>
        <SideBar />
      </div>

      <div className={styles.productListContainer}>
        <h4 id={styles.productListHeading}>ALL PRODUCTS</h4>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className={styles.productListTable}
          autoHeight
        />
      </div>
    </div>
  );
}

export default ProductList;
