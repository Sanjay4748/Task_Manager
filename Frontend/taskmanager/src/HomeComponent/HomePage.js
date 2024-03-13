import { useState,useEffect } from "react";
import styles from './Homecomp.module.css';
function HomePage(){
    const [firstname,setFirstName] = useState("");
    useEffect(() => {
        const userfirstname = localStorage.getItem("firstname");
        if (userfirstname) {
          setFirstName(userfirstname);
        }
      }, []);
    return(
        <div>
          <div className={styles.name} >
          <h2>
          Welcome  {firstname}
           </h2>
          </div>
          <div>
            <h3>
              Your Tasks
            </h3>
          </div>
        </div>
    );
}

export default HomePage;