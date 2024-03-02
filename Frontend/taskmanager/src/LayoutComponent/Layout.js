
import styles from './Layout.module.css';
import Header from './Header';
import Footer from './Footer';
import MidContent from './MidContent';

function Layout(props){
    return(
        <div className={styles.layout}>
            <Header/>
            <div style={{marginTop:"10vh"}}>
            <MidContent children={props.children}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Layout;