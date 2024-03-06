import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import Httfunctions from '../HttpComponent/http-common';

function Signup() {
  const [userEmail, setUserEmail] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [password, setPassword] = useState("");
  const [disableOtp, setDisableOtp] = useState(false);
  const [otpCount, setOtpCount] = useState(0);
  const [otpvalue ,setOtpValue] = useState("");
  const [placeholdermsg , Setplaceholdermsg] = useState("Enter your Otp Here");

  const navigate = useNavigate();
   
  const sendOtp = async (e) => {
    e.preventDefault();
    var otpmsg = {
      "subject":"Otp Verification ",
      "message":""
    }

    await Httfunctions.SendMail(userEmail,otpmsg)
    .then((response) => {
      setOtpValue((response.data.otp).toString());
    }).catch((err) => {
      console.error(err);
    });

    setOtpCount(otpCount + 1);
    if (otpCount === 2) {
      Setplaceholdermsg("Otp Limit exceeded Try After Some Time")
      setDisableOtp(true);
    }
  };

  const SignupHandle = (e) => {
    e.preventDefault();
    if(otpvalue === enteredOtp){
      navigate('/home');
    }
  };

  return (
    <div className={styles.loginbox}>
      <div className={styles.box}>
        <h3>User Login</h3>
      </div>
      <form className={styles.formdiv} onSubmit={SignupHandle} >
        <div>
          <label>Email :</label>
        </div>
        <div>
          <input type="email" value={userEmail} id='email' onChange={(e) => { setUserEmail(e.target.value) }} />
        </div>
        <div>
          <label>OTP</label>
        </div>
        <div>
          <input type="text" value={enteredOtp} placeholder={placeholdermsg} id='otp' onChange={(e) => { setEnteredOtp(e.target.value) }} />
        </div>
        <div style={{ marginLeft: "17vw" }}>
          <button type='button' disabled={disableOtp} style={{ backgroundColor: "greenyellow" }} onClick={sendOtp}>Send OTP</button>
        </div>
        <div>
          <label>Password :</label>
        </div>
        <div>
          <input type="password" value={password} id='password' onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        <div style={{ marginLeft: "12vw" }}>
          Existing User ? <Link to={"/"}>Login here</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
