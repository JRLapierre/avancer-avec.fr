import React from 'react';
import styles from "./styles.module.css"
import floralBorder from "../../assets/pages/Presentation/frame-leaves.png"
import { useHeaderHeight } from '../../hooks/useHeaderHeight';
import { NAV_BARS_HEIGHT } from '../../constants';

interface Props {
    title: string;
    content: string;
}

const TextFrame: React.FC<Props> = ({title, content}) => {

    const headerHeight = useHeaderHeight();

    const backgroundImage = {
        backgroundImage: `url(${floralBorder})`,
    };

    return (
        <div className={styles.textFrame} style={{ minHeight: `calc(100dvh - ${headerHeight.toString()}px - ${(NAV_BARS_HEIGHT*2).toString()}px)` }}>
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