import styles from './Login.module.css';
import { Link } from 'react-router-dom';

function Signup(){

    return(
        <div className={styles.loginbox}>
      <div className={styles.box}>
        <h3>User Login</h3>
      </div>
      <form className={styles.formdiv}>
        <div>
          <label>Email :</label>
        </div>
        <div>
          <input type="email" />
        </div>
        <div>
          <label>OTP</label>
        </div>
        <div>
          <input type="text" />
        </div>
        <div style={{ marginLeft: "17vw" }}>
        <button style={{backgroundColor:"greenyellow"}}>send otp</button>
        </div>
        <div>
          <label>Password :</label>
        </div>
        <div>
          <input type="password" />
        </div>
        <div>
          <button type="submit">Sgn Up</button>
        </div>
        <div style={{ marginLeft: "12vw" }}>
          Existing User ?<Link to={"/"}>Login here</Link>
        </div>
      </form>
    </div>
    );
}

export default Signup;