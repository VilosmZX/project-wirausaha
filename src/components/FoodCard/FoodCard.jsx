import React, { useContext, useState } from 'react'
import styles from './FoodCard.module.css';
import { FaWhatsapp, FaTrash, FaEdit } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import { MenuItem, Select } from '@mui/material';

const FoodCard = ({food, num}) => {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.card}>
      <span  className={styles.num}>{num}</span>
        <img 
            src={food.image}
            alt='Food'
        />
        <div className={styles.info}>
            <span>{food.title}</span>
            <span>Rp{food.price.toLocaleString('id-ID')}</span>
        </div>
        <div className={styles.orderContainer}>
          <a href={`https://wa.me/6282113463302?text=Halo, saya ingin memesan ${food.title}\n, Jumlah: `}><FaWhatsapp size={30} color={'green'} className={styles.orderWa}/></a>
        </div>
        {user && (
          <div className={styles.commands}>
            <FaTrash color='red' className={styles.orderWa} size={30}/>
            <FaEdit color='green' className={styles.orderWa} size={30}/>
          </div>
        )}      
    </div>
  )
}

export default FoodCard