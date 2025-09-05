import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Link to="/legal mentions">mentions légales</Link>
        </footer>
    )

}

export default Footer;