import React, { useEffect } from 'react'
import styles from "./Dashboard.module.scss"
import SideBar from './SideBar'

function Dashboard() {


  return (
    <>
    <div className={styles.dashboard}>
        <div className={styles.firstbox}>
        <SideBar />
        </div>
    </div>
    </>
  )
}

export default Dashboard