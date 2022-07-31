import React, { useState, useContext, useEffect } from 'react'
import styles from './Menu.module.css';
import { FaPlusCircle } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import FoodCard from '../../components/FoodCard/FoodCard';
import { Input } from '@mui/material';

const Menu = () => {
  const [openForm, setOpenForm] = useState(false);
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(true);

  const handleSubmit = async (e) => {
      setDone(false);
      e.preventDefault();
      const title = e.target.title.value;
      const price = e.target.price.value;
      const image = e.target.file.files[0];
      let data = new FormData();
      data.append('title', title);
      data.append('price', price);
      data.append('image', image);
      data.append('owner', user.username);
      let response = await axios('https://JoshuaRVL.pythonanywhere.com/api/add-menu/', {
         method: 'post',
         headers: {
          'content-type': 'multipart/form-data'
         },
         data 
      });
      console.log(response.status)
      if(response.status === 201) {
          const data = response.data;
          setOpenForm(false);
          setFoods([...foods, data]);
          setDone(true);
      }
  };

  useEffect(() => {
      setLoading(true);
      (async () => {
          const response = await fetch(`https://JoshuaRVL.pythonanywhere.com/api/menus/`, {
              method: 'GET',
          });
          const data = await response.json();
          setFoods(data);
      })();
      setLoading(false);
  }, []);

  return (
    <div className={styles.base}>
      <div className={styles.container}>
        <h1>Menu</h1>
        {user && <FaPlusCircle className={styles.icon} size={40} onClick={() => setOpenForm(!openForm)}/>}
        <div className={styles.foodContainer}>
                {loading ? (
                    <div className={styles.warningContainer}>
                        <span className={styles.warning}>Memuat Data</span>
                    </div>
                ) : (
                    <>
                        {foods.length ? (
                            foods.map((food, index) => (
                                <FoodCard setFoods={setFoods} foods={foods} food={food} num={index+1} key={index} />
                            ))
                        ) : (
                            <div className={styles.warningContainer}>
                                <span className={styles.warning}>Belom ada produk nih</span>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className={!openForm ? styles.hideForm : styles.form}>
                <button onClick={() => setOpenForm(!openForm)}>Cancel</button>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input name='title' type={'text'} placeholder='Nama Produk' required/>
                    <input name='price' type={'number'} placeholder='Harga' required/>
                    <input name='file' accept='image/png, image/jpeg' type={'file'} placeholder='Foto produk' required/>
                    <button type={'submit'} disabled={done === false}>Masukan Produk</button>
                    <button type="reset">Reset</button>
                </form>
            </div>
      </div>
    </div>
  )
}

export default Menu