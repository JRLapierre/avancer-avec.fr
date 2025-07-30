import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import styles from './styles.module.css';

const Layout = () => {
    return (
        <>
        <Header />
        <div className={styles.page}>
            <Outlet />
        </div>
        <Footer />
        </>
    )
}

export default Layout;