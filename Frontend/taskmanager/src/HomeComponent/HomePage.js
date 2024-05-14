import { useState, useEffect } from "react";
import styles from "./Homecomp.module.css";
import { Container, Row, Col } from "react-bootstrap";
import HttpFunctions from "../HttpComponent/http-common";

function HomePage() {
  const [firstname, setFirstName] = useState("");
  const [completetasks, setTasks] = useState([]);
  const [taskspresent, setTasksPresent] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userfirstname = localStorage.getItem("firstname");
    if (userfirstname) {
      setFirstName(userfirstname);
    }

    const fetchTasks = async () => {
      try {
        const response = await HttpFunctions.Gettasks();
        if (response.data.response.length > 0) {
          setTasks(response.data.response);
        } else {
          setTasksPresent(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [completetasks]);

  return (
    <div>
      <div className={styles.name}>
        <h2>Welcome {firstname}</h2>
      </div>
      <div>
        <h3>Your Tasks</h3>
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <Container>
            <Row>
              {taskspresent ? (
                completetasks.map((task) => (
                  <Col key={task.taskid} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", margin: "5px", height: "100px" }}>
                    {task.taskname}
                  </Col>
                ))
              ) : (
                <h3>No Tasks Found</h3>
              )}
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
}

export default HomePage;
