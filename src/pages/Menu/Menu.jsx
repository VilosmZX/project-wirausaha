import React, { useState, useContext, useEffect } from 'react'
import styles from './Menu.module.css';
import { FaPlusCircle } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import FoodCard from '../../components/FoodCard/FoodCard';

const Menu = () => {
  const [openForm, setOpenForm] = useState(false);
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();
      const title = e.target.title.value;
      const price = e.target.price.value;
      const image = e.target.file.files[0];
      let data = new FormData();
      data.append('title', title);
      data.append('price', price);
      data.append('image', image);
      data.append('owner', user.username);
      let response = await axios('https://shopwebbackend1.herokuapp.com/api/add-menu/', {
         method: 'post',
         headers: {
          'content-type': 'multipart/form-data'
         },
         data 
      });
      if(response.status === 201) {
          const data = await response.data();
          setOpenForm(!openForm);
          setFoods(foods.push(data));
          alert('Produk Telah ditambahkan!')
      }
  };

  useEffect(() => {
      setLoading(true);
      (async () => {
          const response = await fetch(`https://shopwebbackend1.herokuapp.com/api/menus/`, {
              method: 'GET',
          });
          const data = await response.json();
          setFoods(data);
      })();
      setLoading(false);
  }, [foods]);

  return (
    <div className={styles.base}>
      <div className={styles.container}>
        <h1>Terbaru</h1>
        {user && <FaPlusCircle className={styles.icon} size={40} onClick={() => setOpenForm(!openForm)}/>}
        <div className={styles.foodContainer}>
                {loading ? (
                    <div className={styles.warningContainer}>
                        <span className={styles.warning}>Memuat Data</span>
                    </div>
                ) : (
                    <>
                        {foods.length & !loading ? (
                            foods.map((food, index) => (
                                <FoodCard food={food} key={index} />
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
                    <button type={'submit'}>Masukan Produk</button>
                    <button type="reset">Reset</button>
                </form>
            </div>
      </div>
    </div>
  )
}

export default Menu