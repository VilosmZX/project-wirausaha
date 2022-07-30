import React, {useEffect, useState} from 'react'
import styles from './Header.module.css';

const Header = () => {
  const texts = [['F', 'O', 'O', 'D'], ['B', 'U', 'Y'], ['N', 'O', 'W']];
  const [currentHeader, setCurrentHeader] = useState(0);
  const [headers, setHeaders] = useState(texts[currentHeader]);

  useEffect(() => {
    let interval = setInterval(() => {
      console.log('OMG');
      setCurrentHeader(currentHeader + 1 > texts.length - 1 ? 0 : currentHeader + 1);
      setHeaders(texts[currentHeader]);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentHeader])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
          <div className={styles.headerText}>
            <h1 data-text='Selamat datang!'>Selamat datang!</h1>
            <small data-text='Selamat berbelanja'>Selamat berbelanja</small>
          </div>
      </div>
    </div>
  )
}

export default Header