import React from 'react'
import styles from "./SideBar.module.scss"
import { Avatar, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeIcon from "@mui/icons-material/Home"
import  PostAddIcon from '@mui/icons-material/PostAdd'
import AddIcon from "@mui/icons-material/Add"
import ListAltIcon from "@mui/icons-material/ListAlt"
import RateReviewIcon from "@mui/icons-material/RateReview"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import { useSelector } from 'react-redux'


function SideBar() {
    
    const user = useSelector((state) => state.user.user);
    
  return (
    <>
    <div className={styles.sidebar}>
      <Avatar
        src={user && user.avatar?.url}
        alt="User Avatar"
        className={styles.avatar11}
      />
      <Typography variant="subtitle1" className={styles.name}>
        {user && user.name}
      </Typography>
      <Typography variant="subtitle2" className={styles.email}>
        {user && user.email}
      </Typography>
      <div className={styles.divider} />
      <ul className={styles.sideBarMenu}>
        <Link
          to="/admin/dashboard"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <li className={styles.sideBarMenuItem}>
            <DashboardIcon fontSize="large" />
            <span className={styles.sideBarMenuItem_text}>
              {" "}
              Dashboard
            </span>
          </li>
        </Link>

        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <li className={styles.sideBarMenuItem}>
            <HomeIcon fontSize="large" />
            <span className={styles.sideBarMenuItem_text}>Home</span>
          </li>
        </Link>

        <Link
          to="/admin/products"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <li className={styles.sideBarMenuItem}>
            <PostAddIcon fontSize="large" />

            <span className={styles.sideBarMenuItem_text}>
              {" "}
              Products
            </span>
          </li>
        </Link>
        <Link
          to="/admin/new/product"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <li className={styles.sideBarMenuItem}>
            <AddIcon fontSize="large" />
            <span className={styles.sideBarMenuItem_text}>
              Add Product
            </span>
          </li>
        </Link>

        <Link
          to="/admin/orders"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <li className={styles.sideBarMenuItem}>
            <ListAltIcon fontSize="large" />
            <span className={styles.sideBarMenuItem_text}>Orders</span>
          </li>
        </Link>
        <Link
          to="/admin/reviews"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <li className={styles.sideBarMenuItem}>
            <RateReviewIcon fontSize="large" />
            <span className={styles.sideBarMenuItem_text}>Reviews</span>
          </li>
        </Link>
      </ul>
      <div className={styles.divider} />
      <Button
        className={styles.button}
        // onClick={accountHandler}
        variant="contained"
      >
        <ManageAccountsIcon
          fontSize="large"
          style={{ marginRight: "10px" }}
        />
        Account
      </Button>
    </div>
  </>

  )
}

export default SideBar