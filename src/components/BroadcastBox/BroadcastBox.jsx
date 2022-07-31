import React,{useContext, useState, useEffect} from 'react'
import { FaBroadcastTower, FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import styles from './BroadcastBox.module.css';
import AuthContext from '../../context/AuthContext';
import BroadcastContent from './BroadcastContent';
import BroadcastForm from './BroadcastForm';

const BroadcatBox = () => {
    const { user } = useContext(AuthContext);
    const [broadcasts, setBroadcasts] = useState([]);
    const [currentNews, setCurrentNews] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    useEffect(() => {
        setLoading(true);
        (async () => {
            const response = await fetch('https://JoshuaRVL.pythonanywhere.com/api/news/', {
                method: 'GET'
            });
            const data = await response.json();
            data.forEach((news, index) => {
                const date = new Date(news.date);
                news.date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
            })
            setBroadcasts(data);
        })();
        setLoading(false);
    }, []);

    useEffect(() => {
        let interval = setInterval(() => {
            autoSlide();
        }, 5 * 1000);
        return () => clearInterval(interval);
    }, [currentNews]);

    const nextNews = () => {
        setCurrentNews(currentNews + 1);
    };

    const prevNews = () => {
        setCurrentNews(currentNews - 1);
    };

    const autoSlide = () => {
        setCurrentNews(currentNews + 1 > broadcasts.length - 1 ? 0 : currentNews + 1);
    }
    return (
        <>
            <BroadcastForm openForm={openForm} setCurrentNews={setCurrentNews} setBroadcasts={setBroadcasts} broadcasts={broadcasts} setOpenForm={setOpenForm}/>
            <div className={styles.container}>
                <div className={styles.broadcastBox}>
                    <div className={styles.title}>
                        <h2>News</h2>
                        {user && (
                            <div className={styles.buttonContainer}>
                                <div className={styles.broadcastBtn}>
                                    <FaBroadcastTower size={30} onClick={() => setOpenForm(!openForm)}/>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.broadcastContent}>
                        <ul>
                            {!loading ? (
                                broadcasts.length ? (
                                    broadcasts.map((bc, index) => (
                                        <li key={index} className={currentNews !== index ? styles.hiddenNews : styles.showNews}>
                                            <BroadcastContent bc={bc}/>
                                        </li>
                                    ))
                                ) : (
                                    <li className={styles.showNews}>
                                        <h1>Tidak ada berita</h1>
                                    </li>
                                )
                            ) : (
                                <li className={styles.showNews}>
                                    <h1>Memuat berita...</h1>
                                </li>
                            )}
                        </ul>
                        <div className={styles.buttons}>
                            <FaArrowAltCircleLeft size={30} className={currentNews - 1 < 0 && styles.hiddenBtn} onClick={prevNews}>Prev</FaArrowAltCircleLeft>
                            <FaArrowAltCircleRight size={30} className={currentNews + 1 > broadcasts.length - 1 && styles.hiddenBtn} onClick={nextNews}>Next</FaArrowAltCircleRight>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BroadcatBox