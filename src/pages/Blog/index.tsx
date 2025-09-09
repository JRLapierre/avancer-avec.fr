import styles from "./styles.module.css"
import bridge from "../../assets/pages/Blog/bridge-1837210_1280.jpg"
import { useClickOutside } from "../../hooks/useClickOutside";

const Blog = () => {

    const [menuRef, isMenuVisible, setIsMenuVisible] = useClickOutside<HTMLDivElement>(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    return (
        <>
        <div className={styles.imageBloc}>
            <h1>Petit pas pour avancer</h1>
            <p className={styles.quote}>
                « Ce n’est pas parce que les choses sont difficiles que nous n’osons pas, 
                c’est parce que nous n’osons pas qu’elles sont difficiles. »
            </p>
            <p className={styles.author}>Sénèque</p>
            <div className={styles.border}>
                <img src={bridge} alt="pont" />
                <p>
                    Zone de confort, ça vous dit quelque chose ?<br/>
                    Ce qui est difficile pour l’un ne l’est pas forcément pour un autre.<br/>
                    Ce qui m’amène à dire que pour oser, pour commencer à oser, j’ai parfois
                    besoin de l’aide d’un autre pour lequel, ce que j’entreprends n’est pas – ou
                    n’est plus si difficile.<br/>
                    Par exemple, cette belle photo ci-dessus et son texte : je ne savais pas
                    comment la trouver, vous l’amener. Et je n’osais pas, trop difficile, peur de faire
                    des bêtises avec l’ordinateur. Mais une amie savait faire, ayant appris par jeu ;
                    donc nous avons fait ensemble et ce n’est (presque) plus difficile pour moi.<br/>
                    J’ose chercher et trouver seule et avec plaisir.<br/>
                    Réflexion : ai-je besoin d’aide pour oser ?<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toujours ?<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dans quels domaines principalement ?<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Et… suis-je disponible pour apporter un petit coup de « boost » à
                    quelqu’un ? Rassurer, apporter des compétences pour permettre d’oser ?<br/>
                </p>
            </div>
            <div className={styles.border}>
                <p>Je vous ai préparé une douzaine de “petits pas pour avancer”. En voulez-vous? Je vous les envoie gratuitement deux fois par semaine. Inscrivez-vous.</p>
            </div>
            <div className={styles.border}>
                <button className={styles.submitButton} type="submit" onClick={toggleMenu}>Recevoir d'autres petits pas pour avancer</button>
            </div>
        </div>
        {isMenuVisible && <div ref={menuRef} className={styles.menu}>

        </div>}
        </>
    )
}

export default Blog;