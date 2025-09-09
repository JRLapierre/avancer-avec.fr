import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import logo from '/logo.png';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useScreenWiderThan } from '../../hooks/useScreenWiderThan';


const Header = () => {

    const [menuRef, isMenuVisible, setIsMenuVisible] = useClickOutside<HTMLDivElement>(false);
    const isDesktop = useScreenWiderThan(768);

    /**
     * Permits the display of the menu on a narrow screen
     */
    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    return(
        <header>
            {/* Icon */}
            <div>
                <Link to="/">
                    <img src={logo} alt="logo" height="70"/>
                </Link>
            </div>
            {/* Title */}
            <div className={styles.title}>
                <p>Claire-Lise Coach pour avancer</p>
            </div>
            {/* menu */}
            <nav>
                <div onClick={toggleMenu} className={styles.menu_icon}>
                    Menu
                </div>
                {(isDesktop || isMenuVisible) && <div ref={menuRef} className={styles.menu}>
                    <Link to="/">accueil</Link>
                    <Link to="/presentation">Présentation</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/contact">Me contacter</Link>
                </div>}
            </nav>
        </header>
    )
}

export default Header;