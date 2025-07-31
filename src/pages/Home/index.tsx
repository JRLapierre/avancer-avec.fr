import React from "react";
import styles from "./styles.module.css"
import welcomeImage from '../../assets/page/Home/chemin-texte.png'

const Home: React.FC = () => {
    return (
        <div className={styles.content}>
            <h1>Accueil</h1>
            <img src={welcomeImage} alt="bienvenue" />
        </div>
    )
}

export default Home;