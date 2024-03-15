import { useEffect } from 'react';
import styles from './Homecomp.module.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function ProfilePage(){

    const navigate = useNavigate();
    const [firstname,setFirstName] = useState("");
    const [email,setEmail] = useState("");
    useEffect(()=>{
        const userfirstname = localStorage.getItem("firstname");
        const useremail = localStorage.getItem("email");
        if(userfirstname && useremail){
            setFirstName(userfirstname);
            setEmail(useremail);
        }

    },[])

    function Logout(){
        localStorage.clear();
        navigate('/login');
    }
    function ChangePassword(){
        navigate('/changepassword');
    }

    return(
        <div className={styles.profile} >
            <div>
                <img src='dog.jpg' alt='your profileimage' className={styles.profileimg} />
            </div>
            <div>
            <h3>Name</h3>
            <h4>:</h4>
            <h4>{firstname}</h4>
            </div>
            <div>
            <h3>Email</h3>
            <h4>:</h4>
            <h4>{email}</h4>
            </div>
            <div>
            <h3>Tasks completed</h3>
            <h4>:</h4>
            <h4>4</h4>
            </div>
            <div1>
            <button onClick={ChangePassword} >
                change password
            </button>
            </div1>
            <div1 className={styles.profilelogout} >
            <button onClick={Logout} >
                Logout
            </button>
            </div1>
        </div>
    );
}

export default ProfilePage;