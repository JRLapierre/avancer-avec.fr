import React from 'react';
import styles from "./styles.module.css"
import floralBorderTop from "../../assets/page/Presentation/Image_florale_top_1.png"
import floralBorderBottom from "../../assets/page/Presentation/Image_florale_bottom_1.png"

interface Props {
    title: string;
    content: string;
}

const TextFrame: React.FC<Props> = ({title, content}) => {

    const outerLayer = {
        backgroundImage: `url(${floralBorderTop})`,
    };

    const innerLayer = {
        backgroundImage: `url(${floralBorderBottom})`,
    }

    return (
        <div className={styles.textFrame}>
            <h2>{title}</h2>
            <div className={styles.outerLayer} style={outerLayer}>
                <div className={styles.innerLayer} style={innerLayer}>
                    <p className={styles.textSurrounded}>{content}</p>
                </div>
            </div>
        </div>
    );
};

export default TextFrame;