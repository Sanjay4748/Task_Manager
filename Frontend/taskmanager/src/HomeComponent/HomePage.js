import { useState, useEffect } from "react";
import styles from "./Homecomp.module.css";
import { Container, Row, Col } from "react-bootstrap";
import HttpFunctions from "../HttpComponent/http-common";

function HomePage() {
  const [firstname, setFirstName] = useState("");
  const [completetasks, setTasks] = useState([]);

  useEffect(() => {
    const userfirstname = localStorage.getItem("firstname");
    if (userfirstname) {
      setFirstName(userfirstname);
    }
  
    const fetchTasks = async () => {
      try {
        const response = await HttpFunctions.Gettasks();
        const responsearr = response.data?.response;
        if (responsearr && responsearr.length > 0) {
          setTasks(responsearr);
        } else {
          setTasks([{ taskname: "No tasks found" }]);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchTasks();
  }, []);
  

  return (
    <div>
      <div className={styles.name}>
        <h2>Welcome {firstname}</h2>
      </div>
      <div>
        <h3>Your Tasks</h3>
        <Container  >
          <Row>
            {completetasks.map((task, index) => (
              <Col key={index} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", margin: "5px", height:"100px"}}>
                {task.taskname}
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
