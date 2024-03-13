import styles from './Layout.module.css';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';

function Layout(props) {
    return (
        <div className={styles.layout}>
            <Header />
            <div style={{ marginTop: "10vh" }}>
                <Navbar/>
            </div>
            <div className={styles.midcontent} >
                {props.child}
            </div>
            <Footer/>
        </div>
    );
}

export default Layout;
