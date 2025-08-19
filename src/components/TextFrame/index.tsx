import React from 'react';
import styles from "./styles.module.css"
import floralBorder from "../../assets/page/Presentation/frame-leaves.png"

interface Props {
    title: string;
    content: string;
}

const TextFrame: React.FC<Props> = ({title, content}) => {

    const backgroundImage = {
        backgroundImage: `url(${floralBorder})`,
    };

    return (
        <div className={styles.textFrame}>
            <div className={styles.outerLayer} style={backgroundImage}>
                <div className={styles.innerLayer} style={backgroundImage}>
                    <div className={styles.content}>
                        <h2>{title}</h2>
                        <p className={styles.textSurrounded}>{content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextFrame;