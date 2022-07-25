import React, { useState, useContext } from "react";
import styles from './Navbar.module.css';
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    let { user, logoutUser } = useContext(AuthContext);

    return (
        <nav>
            <div className={styles.container}>
                <h1>TOKKO</h1>
                <div className={styles.menu}>
                    <NavLink to="/" className={({isActive}) => isActive ? styles.isActive : ''}>Home</NavLink>
                    <NavLink to="menu" className={({isActive}) => isActive ? styles.isActive : ''}>Menu</NavLink>
                    {user && <div><span className={styles.account}>{user.username}</span><sup onClick={logoutUser}>Logout</sup></div>}
                </div>
                <button onClick={() => setIsActive(!isActive)} className={`${styles.hamburger} ${isActive ? styles.isActive : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div className={isActive ? styles.mobileMenuActive : styles.mobileMenu}>
                <div className={styles.mobileContainer}>
                    <NavLink onClick={() => setIsActive(false)} to="/" className={({isActive}) => isActive ? styles.isActive : ''}>Home</NavLink>
                    <NavLink onClick={() => setIsActive(false)} to="menu" className={({isActive}) => isActive ? styles.isActive : ''}>Menu</NavLink>
                    {user && <span className={styles.mobileName}>hello, {user?.username}</span>}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;