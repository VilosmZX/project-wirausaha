import React from 'react'
import styles from './ErrorPage.module.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.errorContainer}>
            <h1>404 Page Not Found</h1>
            <Link to='/'>Kembali ke home page</Link>
        </div>
    </div>
  )
}

export default ErrorPage