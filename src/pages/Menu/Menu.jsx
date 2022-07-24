import React, { useState } from 'react'
import styles from './Menu.module.css';
import FoodList from '../../components/FoodList/FoodList';

const Menu = () => {
  return (
    <div className={styles.base}>
      <div className={styles.container}>
        <h1>Terbaru</h1>
        <FoodList />
      </div>
    </div>
  )
}

export default Menu