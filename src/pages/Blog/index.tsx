import styles from "./styles.module.css"
import theLittlePrince from "../../assets/pages/Blog/the-little-prince-5235474_1280.jpg"
import bridge from "../../assets/pages/Blog/bridge-1837210_1280.jpg"

const Blog = () => {
    return (
        <>
            <h1>Blog</h1>
            <p>Bienvenue ici où je partage des pensées inspirantes ou de réflexion et des expériences de vie. Page où l’on peut laisser son empreinte. Contactez-moi.</p>
            <div className={styles.imageBloc}>
                <img src={bridge} alt="pont" />
                <p>« Ce n’est pas parce que les choses sont difficiles que nous n’osons pas, c’est parce que nous n’osons pas qu’elles sont difficiles. »</p>
                <p>Sénèque</p>
            </div>
            <div className={styles.imageBloc}>
                <img src={theLittlePrince} alt="Le petit prince" />
                <p>« On ne voit bien qu’avec le cœur, l’essentiel est invisible pour les yeux. »</p>
                <p>Antoine de Saint Exupéry</p>
            </div>
        </>
        
    )
}

export default Blog;