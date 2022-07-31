import React, { useContext, useState } from 'react'
import styles from './FoodCard.module.css';
import { FaWhatsapp, FaTrash, FaEdit } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import { MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { CirclesWithBar } from 'react-loader-spinner';

const FoodCard = ({food, num, setFoods, foods}) => {
  const { user } = useContext(AuthContext);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteFood = async () => {
    setLoadingDelete(true);
    const response = await axios(`https://JoshuaRVL.pythonanywhere.com/api/delete-menu/${food.id}/`);
    if(response.status === 204) {
      const newList = foods.filter((item) => item.id !== food.id);
      setFoods(newList);
    }
    setLoadingDelete(false);
  };

  return (
    <div className={styles.card}>
      {loadingDelete && (
        <CirclesWithBar
          height = "100"
          width = "100"
          radius = "10"
          color = '#01fe87'
          ariaLabel = 'three-dots-loading'  
          wrapperClass={styles.loading}   
        />
      )}
      <span className={styles.num}>{num}</span>
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
            <FaTrash color='red' onClick={deleteFood} className={styles.orderWa} size={30}/>
            <FaEdit color='green' className={styles.orderWa} size={30}/>
          </div>
        )}      
    </div>
  )
}

export default FoodCard