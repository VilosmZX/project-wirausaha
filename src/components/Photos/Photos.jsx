import React, { useState, useEffect } from 'react'
import styles from './Photos.module.css';
import Food1 from '../../images/food1.jpg';
import Food2 from '../../images/food2.jpg';
import Food3 from '../../images/food3.jpg';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const Photos = () => {
  const [current, setCurrent] = useState(0);
  const images = [Food1, Food2, Food3];

  useEffect(() => {
    let interval = setInterval(() => {
      nextSlide()
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1)
  }

  console.log(current);

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <>
      <div className={styles.slider}>
        <FaArrowAltCircleLeft className={styles['left-arrow']} onClick={prevSlide} />
        <FaArrowAltCircleRight className={styles['right-arrow']} onClick={nextSlide} />
        {images.map((value, index) => (
          <div className={index === current ? `${styles.slide} ${styles.active}` : styles.slide} key={index}>
            {index === current && (
              <img src={value} key={index} className={styles.image}/>
            )}
          </div>
        ))}
      </div>   
    </>
  )
}

export default Photos