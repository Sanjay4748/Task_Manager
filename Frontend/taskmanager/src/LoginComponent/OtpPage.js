import { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import HttpFunctions from '../HttpComponent/http-common';

function OtpLayout() {
  const [timerRunning, setTimerRunning] = useState(true);
  const [timemin, setTimemin] = useState(0);
  const [timesec, setTimeSec] = useState(59);
  const [otpcount, setOtpCount] = useState(1);
  const [disable,setDisable] = useState(true);
  const [otpenteredvalue,setOtpEnteredValue] = useState("");
  const [otporiginalvalue,setOtpOriginalValue] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  // const email = location.state.email;

  var mailobj ={
    "message":"",
    "subject":"Otp For Task Tracker Application "
  }

  // const SendOtp =async()=>{
  //   await HttpFunctions.SendMail(email,mailobj)
  //   .then((response)=>{
  //     setOtpOriginalValue(response.data?.otp);
  //   })
  //   .catch((err)=>{
  //     console.error(err);
  //   })
  // }

  useEffect(() => {
    const interval = setInterval(() => {
      if (timesec === 0) {
        setTimemin((prev) => prev - 1);
        setTimeSec(59);
      } else {
        setTimeSec((prev) => prev - 1);
      }
    }, 50);

    if (timemin === 0 && timesec === 0) {
      clearInterval(interval);
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timemin, timesec]);

  const resendOtp = (e) => {
    e.preventDefault();
    setOtpCount(otpcount + 1);
    if(otpcount<3){
      
      setTimemin(1);
      setTimeSec(59);
      setTimerRunning(true);
    }else{
    setTimerRunning(false);
    setDisable(false);
    }
  };

  const HandleSentOtp =(e)=>{
    e.preventDefault();
    if(otpenteredvalue === otporiginalvalue.toString()){
      navigate('/');
    }
  }

 

  return (
    <div className={styles.loginbox}>
      <div className={styles.box}>
        <h3>Verify Otp</h3>
      </div>
      {disable?
      <form className={styles.formdiv} onSubmit={HandleSentOtp}>
        <div>
          <label>Enter Otp</label>
        </div>
        <div>
          <input type="text" placeholder="Enter Your Otp Here" id="otp" value={otpenteredvalue} onChange={(e)=>{setOtpEnteredValue(e.target.value)}} />
        </div>
        {timerRunning?<div>
          <p>
            0{timemin}:{timesec < 10 ? `0${timesec}` : timesec}
          </p>
        </div>:null}
          <div style={{ marginLeft: '16vw', marginTop: '3vh' }}>
            <button
              type="button"
              style={{ backgroundColor: 'greenyellow' }}
              onClick={resendOtp}
              disabled={timerRunning}
            >
              Send Otp
            </button>
          </div>
        <div style={{ marginTop: '3vh' }}>
          <button type="submit">Verify</button>
        </div>
        <div style={{ marginTop: '3vh' }}>
          <p style={{ color: 'green' }}>OTP Successfully Sent to your Mail</p>
        </div>
      </form>:<div>
        Otp Limit Exceeded Try After Some Time Again
        </div>
}
    </div>
  );
}

export default OtpLayout;
