import React from "react";
import welcomeImage from '../../assets/page/Home/chemin-texte.png'

const Home: React.FC = () => {
    return (
        <>
            <h1>Accueil</h1>
            <img src={welcomeImage} alt="bienvenue" />
        </>
    )
}

export default Home;