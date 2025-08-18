import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import logo from '/logo.png';
import { useEffect, useRef } from 'react';


const Header = () => {

    const menuRef = useRef<HTMLDivElement | null>(null);

    /**
     * Permits the display of the menu on a narrow screen
     */
    const toggleMenu = () => {
        if (!menuRef.current) return;
        menuRef.current.style.display =  'flex';
    };

    /**
     * Takes menu away if we click anywere else on the screen
     */
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!menuRef.current) return;
            const mediaQuery = window.matchMedia("(max-width: 768px)");
            const target = event.target as Node;
            if (!menuRef.current.contains(target) && mediaQuery.matches) {
                menuRef.current.style.display = '';
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                <div ref={menuRef} className={styles.menu}>
                    <Link to="/">Page d'accueil</Link>
                    <Link to="/presentation">Présentation</Link>
                    <Link to="/blog">Blog</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;