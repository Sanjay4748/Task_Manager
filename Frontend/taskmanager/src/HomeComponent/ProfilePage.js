import styles from './Homecomp.module.css';

function ProfilePage(){
    return(
        <div className={styles.profile} >
           <div>
            <h3>name : </h3>
            <p>sanjay</p>
           </div>
        </div>
    );
}

export default ProfilePage;