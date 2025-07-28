import styles from './styles.module.css';
import { useEffect, useRef, useState } from 'react';


const Header = () => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    /**
     * Permits the display of the menu on a narrow screen
     */
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    /**
     * Takes menu away if we click anywere else on the screen
     */
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            if (menuRef.current && !menuRef.current.contains(target)) {
                setMenuOpen(false);
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
                <img src="/public/logo.png" alt="logo" height="70"/>
            </div>
            {/* Title */}
            <div className={styles.title}>
                <p>Claire-Lise Coach pour avancer</p>
            </div>
            {/* menu */}
            <nav ref={menuRef}>
                <div onClick={toggleMenu} className={styles.menu_icon}>
                    Menu
                </div>
                <div className={menuOpen ? styles.menu_horisontal : styles.menu_vertical}>
                    <a href='/'>Page d'accueil</a>
                    <a href='#'>Présentation</a>
                    <a href='#'>Blog</a>
                </div>

            </nav>
        </header>
    )
}

export default Header;