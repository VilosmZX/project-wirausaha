import React from 'react'
import styles from './FoodCard.module.css';

const FoodCard = ({food}) => {
  return (
    <div className={styles.card}>
        <img 
            src={food.image}
            alt='Food'
        />
        <div>
            <span>{food.title}</span>
            <span>${food.price}</span>
        </div>
    </div>
  )
}

export default FoodCard