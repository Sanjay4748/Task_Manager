import styles from './Layout.module.css';

function MidContent(props){
    return(
        <div>
            <div className={styles.midcontent}>
                <div className={styles.sidebarcontent}>
                    <h3>Sidebar part</h3>
                </div>
                <div className={styles.midsec2content}> 
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default MidContent;