import styles from './Layout.module.css'

function Header(){
    return(
        <div>
            <header className={styles.head}>
                <h2>
                Task Manager Web Application
                </h2>
            </header>
        </div>
    );
}


export default Header;