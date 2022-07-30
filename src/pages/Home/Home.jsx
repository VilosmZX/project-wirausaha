import React from 'react'
import styles from './Home.module.css';
import Photos from '../../components/Photos/Photos';
import Header from '../../components/Header/Header';
import BroadcastBox from '../../components/BroadcastBox/BroadcatBox';

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />  
      <BroadcastBox />
    </div>
  )
}

export default Home