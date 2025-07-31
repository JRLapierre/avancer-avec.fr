import styles from './styles.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            {/* Column 1 */}
            <div>
                <h3>Où ?</h3>
                <p>A domicile, via visioconférence ou en extérieur</p>
                <p>Basée à Hénin-Beaumont</p>
            </div>
            {/* Column 2 */}

            <div>
                <h3>Horaires</h3>
                <p>Lundi 9h - 12h</p>
                <p>Mardi au Vendredi 9h - 20h</p>
                <p>Samedi matin 9h - 13h</p>
            </div>
            {/* Column 3 */}
            <div>
                <h3>Contact</h3>
                <p>06.37.24.35.40</p>
                <p>clairelise@avancer-avec.fr</p>
            </div>
        </footer>
    )

}

export default Footer;