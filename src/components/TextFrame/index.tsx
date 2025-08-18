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
        backgroundColor: 'white',
        backgroundImage: `url(${floralBorderTop})`,
        backgroundRepeat: `no-repeat`,
        backgroundSize: `100%`
    };

    const innerLayer = {
        display: 'flex',
        backgroundImage: `url(${floralBorderBottom})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        backgroundPosition: 'bottom',
    }

    return (
        <>
        <h2>{title}</h2>
        <div style={outerLayer}>
            <div style={innerLayer}>
                <p className={styles.textSurrounded}>{content}</p>
            </div>
        </div>
        </>
    );
};

export default TextFrame;