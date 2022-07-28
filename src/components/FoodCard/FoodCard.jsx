import React from 'react'
import styles from './FoodCard.module.css';
import { FaWhatsapp } from 'react-icons/fa';

const FoodCard = ({food}) => {
  console.log(food);
  return (
    <div className={styles.card}>
        <img 
            src={`http://47.254.249.69:8000${food.image}`}
            alt='Food'
        />
        <div className={styles.info}>
            <span>{food.title}</span>
            <span>Rp{food.price.toLocaleString('id-ID')}</span>
        </div>
        <div className={styles.orderContainer}>
          <a href={`https://wa.me/6282113463302?text=Halo, saya ingin memesan ${food.title}\n, Jumlah: `}><FaWhatsapp size={30} color={'green'} className={styles.orderWa}/></a>
        </div>
    </div>
  )
}

export default FoodCard