import React from "react";
//import welcomeImage from '../../assets/page/Home/chemin-texte.png' //TODO delete useless image
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
        <div>
            {/* TODO photo and comment */}
        </div>
        <div>
            {/* TODO Buttons towards "ce que je vous propose" and "mon parcours, ma vision" */}
        </div>
        </>
    )
}

export default Home;