import React, { useContext, useState } from 'react'
import styles from './BroadcastForm.module.css';
import AuthContext from '../../context/AuthContext';
import { FaGoodreads } from 'react-icons/fa';
import axios from 'axios';

const BroadcastForm = ({setCurrentNews, setBroadcasts,  broadcasts, openForm, setOpenForm}) => {
    const {user} = useContext(AuthContext);
    const [done, setDone] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDone(false);
        const content = e.target.content.value;
        const response = await axios('https://JoshuaRVL.pythonanywhere.com/api/add-news/', {
            method: 'post',
            data: {
                broadcaster: user.username,
                body: content
            }
        });
        if(response.status === 201) {
            const data = response.data;
            setBroadcasts([data, ...broadcasts]);
            setCurrentNews(0);
            setOpenForm(!openForm);
            setDone(true);
        }
    };
    return (
        <div className={openForm ? styles.container : styles.hideForm}>
            <div className={styles.formContainer}>
                <form method='post' onSubmit={e => handleSubmit(e)}>
                    <input type={'text'} name='content' id='content' placeholder='Broadcast apa?' required/>
                    <button disabled={!done} type="submit">Broadcast!</button>
                    <button onClick={() => setOpenForm(!openForm)}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default BroadcastForm