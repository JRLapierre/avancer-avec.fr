import React from "react";
import coach_1965 from '../../assets/pages/Home/coach_1965.jpg'
import styles from './styles.module.css'

const Home: React.FC = () => {
    return (
        <>
        <div className={styles.hook}>
            <div className={styles.bloc1}>
                <h1>Vous avez envie d’avancer ?</h1>
                <h5>De dépasser les frustrations, blocages, craintes ?</h5>
            </div>
            <div className={styles.bloc2}>
                <h2>Je vous accompagne !</h2>
            </div>
            <div className={styles.bloc3}>
                <h3>Claire-Lise, coach certifiée à Hénin-Beaumont</h3>
            </div>
        </div>
        <div className={styles.baby}>
            <img src={coach_1965} alt="Bébé, déja coach" />
            <p>Coach depuis toujours (photo prise en 1965)</p>
        </div>
        </>
    )
}

export default Home;