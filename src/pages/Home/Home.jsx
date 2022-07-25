import React from 'react'
import styles from './Home.module.css';
import Photos from '../../components/Photos/Photos';
import Header from '../../components/Header/Header';

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <Photos />    
    </div>
  )
}

export default Home