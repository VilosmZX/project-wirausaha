import React, {useEffect, useState} from 'react'
import FoodCard from '../FoodCard/FoodCard';
import styles from './FoodList.module.css';

const FoodList = () => {
    const [foods, setFoods] = useState([]);
    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:8000/api/menus/`, {
                method: 'GET',
            });
            const data = await response.json();
            setFoods(data);
            console.log('foods', foods);
        })();
    }, []);
    return (
        <div className={styles.foodContainer}>
            {foods.length ? (
                foods.map((food, index) => (
                    <FoodCard food={food} key={index} />
                ))
            ) : (
                'loading'
            )}
        </div>
    )
}

export default FoodList