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
