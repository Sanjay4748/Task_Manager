import styles from './Login.module.css';
import { Link } from 'react-router-dom';

function ForgotPassword(){
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
          <label>Password :</label>
        </div>
        <div>
          <input type="password" />
        </div>
        <div style={{ marginLeft: "16vw" }}>
          <Link to={"/forgotpassword"}>forgot password?</Link>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div style={{ marginLeft: "14vw" }}>
          New User <Link to={"/signup"}>Signup here</Link>
        </div>
      </form>
    </div>
    );
}

export default ForgotPassword;