import styles from './Login.module.css'

function LoginLayout(props){
    return(
        <div className={styles.box}>
            <div className={styles.container}>
                <div className={styles.imgsec} >
                    <img src='task.png' alt='taskimage'/>
                </div>
                <div className={styles.formsec} >
                    <div className={styles.box} >
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginLayout;