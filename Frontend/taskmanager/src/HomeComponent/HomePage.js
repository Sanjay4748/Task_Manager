import { useState, useEffect } from "react";
import styles from "./Homecomp.module.css";
import HttpFunctions from "../HttpComponent/http-common";

function HomePage() {
  const [firstname, setFirstName] = useState("");
  const [completetasks, setTasks] = useState([]);

  useEffect(() => {
    const userfirstname = localStorage.getItem("firstname");
    if (userfirstname) {
      setFirstName(userfirstname);
    }

    const ALLtasks = async () => {
      await HttpFunctions.Gettasks()
        .then((response) => {
          setTasks(response.data.response);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    ALLtasks();
  }, []);

  return (
    <div>
      <div className={styles.name}>
        <h2>Welcome {firstname}</h2>
      </div>
      <div style={{display:"flex"}} >
        <div style={{alignItems:"center"}} ><h3>Your Tasks</h3></div>

        <div>
          <div className = {styles.taskbox}>
            hi
          </div>

          {/* {completetasks.map((task, index) => (
            <h2 key={index}>{task.taskname}</h2> 
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
