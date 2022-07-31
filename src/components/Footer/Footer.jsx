import React from 'react'
import styles from './Footer.module.css';
import { FaInstagram, FaWhatsapp, FaMailBulk } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className={styles.container}>
        <div className={styles.footerContainer}>
            <div className={styles.socialMedia}>
                <FaInstagram size={40} color='white' style={{background:'linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)', borderRadius: '30px'}}/>
                <span>@testinstagram</span>
            </div>
            <div className={styles.socialMedia}>
                <FaWhatsapp size={40} color='white' style={{background: '#34B7F1',borderRadius: '30px'}}/>
                <span>(+62) 821-1346-3302</span>
            </div>
            <div className={styles.socialMedia}>
                <FaMailBulk size={40} color='white' style={{background: '#34B7F1',borderRadius: '30px'}}/>
                <span>jravaell@gmail.com</span>
            </div>
        </div>
    </div>
  )
}

export default Footer