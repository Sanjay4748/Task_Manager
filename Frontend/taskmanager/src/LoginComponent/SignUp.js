import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import HttpFunctions from "../HttpComponent/http-common";
import Validations from "../ValidationsComponent/Validations";

function Signup() {
  const [userfirstname, setUserFirstname] = useState("");
  const [userLastname, setUaseLastname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpenteredvalue, setOtpEnteredValue] = useState("");
  const [otporiginalvalue, setOtpOriginalValue] = useState("");
  const [timemin, setTimemin] = useState(0);
  const [timesec, setTimeSec] = useState(59);
  const [otpcount, setOtpCount] = useState(0);
  const [emailexist, setEmailExist] = useState(false);
  const [signupdisable, setSignupDisable] = useState(true);
  const [fieldrequired, setFieldRequired] = useState(false);
  const [passvalidation,setPassValidation] = useState(true);
  const [otpfield, setOtpfield] = useState(true);
  const [timerRunning, setTimerRunning] = useState(false);
  const [disable, setDisable] = useState(true);
  const [savedata,setSaveData] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (userfirstname && userLastname && userEmail && passvalidation) {
      setSignupDisable(false);
    } else {
      setSignupDisable(true);
    }
  }, [userfirstname, userLastname, userEmail, passvalidation]);

  const SignupHandle = async (e) => {
    e.preventDefault();

    if (userfirstname !== "" && userLastname !== "" && userEmail !== "" && password !== "") {
      await HttpFunctions.GetUser(userEmail)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === 400) {
            setOtpfield(false);
          } else if (response.data.status === 200) {
            setEmailExist(true);
          } else {
            SendOtp();
            setOtpfield(false);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      setSignupDisable(true);
    }
  };

  const NameHandle = (e) => {
    const isvalid = Validations.NameValidation(e.target.value);
    if (isvalid) {
      setFieldRequired(false);
    } else {
      setFieldRequired(true);
    }
  };

  const EmailHandle = (e) => {
    const isvalid = Validations.EmailValidation(e.target.value);
    if (isvalid) {
      setFieldRequired(false);
    } else {
      setFieldRequired(true);
    }
  };

  const PasswordHandle = (e) =>{
    setPassword(e.target.value);
    const isValid = Validations.PasswordValidation(e.target.value);
    if(isValid){
      setPassValidation(true);
    }else{
      setPassValidation(false);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (timesec === 0) {
        setTimemin((prev) => prev - 1);
        setTimeSec(59);
      } else {
        setTimeSec((prev) => prev - 1);
      }
    }, 1000);

    if (timemin === 0 && timesec === 0) {
      clearInterval(interval);
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timemin, timesec]);

  var mailobj = {
    "message": "",
    "subject": "Otp For Task Tracker Application "
  }

  const SendOtp = async () => {
    await HttpFunctions.SendMail(userEmail, mailobj)
      .then((response) => {
        setOtpOriginalValue(response.data?.otp);
      })
      .catch((err) => {
        console.error(err);
      })
  };


  const resendOtp = (e) => {
    e.preventDefault();
    setOtpCount(otpcount + 1);
    if (otpcount < 3) {
      SendOtp();
      setTimemin(1);
      setTimeSec(59);
      setTimerRunning(true);
    } else {
      setTimerRunning(false);
      setDisable(false);
    }
  };


  const HandleSentOtp = (e) => {
    e.preventDefault();
    const signupobj = {
      firstname: userfirstname,
      lastname: userLastname,
      email: userEmail,
      password: password,
    };

    if (otpenteredvalue === otporiginalvalue.toString()) {
      HttpFunctions.AddUser(signupobj)
        .then((response) => {
          console.log(response.data);
          if(response.data?.status === 200){
            setDisable(false);
            setSaveData(true);
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          };
        })
    }
  };


  return (
    <div className={styles.loginbox} style={{ height: "55vh" }}>
      {otpfield ? <div className={styles.box}>
        <h3>User Login</h3>
      </div> : <div className={styles.box}>
        <h3>Verify Otp</h3>
      </div>}
      {otpfield ?
        <div>
          <form className={styles.formdiv} onSubmit={SignupHandle}>
            <div>
              <label>First Name:</label>
            </div>
            <div>
              <input
                type="text"
                value={userfirstname}
                id="firstname"
                onChange={(e) => {
                  setUserFirstname(e.target.value);
                }}
                onBlur={(e) => NameHandle(e)}
              />
            </div>
            <div>
              <label>Last Name:</label>
            </div>
            <div>
              <input
                type="text"
                value={userLastname}
                id="lastnamme"
                onChange={(e) => {
                  setUaseLastname(e.target.value);
                }}
                onBlur={(e) => NameHandle(e)}
              />
            </div>
            <div>
              <label>Email :</label>
            </div>
            <div>
              <input
                type="email"
                value={userEmail}
                id="email"
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                onBlur={(e) => { EmailHandle(e) }}
              />
            </div>
            {emailexist ? (
              <span style={{ color: "blue", fontSize: "15px", marginLeft: "17px" }}>
                Email Already Exists Try to Login or use Different mail
              </span>
            ) : null}
            <div>
              <label>Password :</label>
            </div>
            <div>
              <input
                type="password"
                value={password}
                id="password"
                onChange={(e) => {
                  PasswordHandle(e);
                }}
              />
            </div>
            <div>
              <button type="submit" disabled={signupdisable}>
                Sign Up
              </button>
            </div>
            <div style={{ marginLeft: "10.5vw" }}>
              Existing User ? <Link to={"/login"}>Login here</Link>
            </div>
          </form>
          {fieldrequired?<span style={{ display: "flex", justifyContent: "center", color: "red" }}>*Incorrect Input</span> : null}
          {passvalidation?null:<span style={{ display: "flex", justifyContent: "center", color: "red" }}>Password should be less than 15 char with one capital and no spaces</span> }
        </div> : <div>
          {disable ?
            <form className={styles.formdiv} onSubmit={HandleSentOtp}>
              <div>
                <label>Enter Otp</label>
              </div>
              <div>
                <input type="text" placeholder="Enter Your Otp Here" id="otp" value={otpenteredvalue} onChange={(e) => { setOtpEnteredValue(e.target.value) }} />
              </div>
              {timerRunning ? <div>
                <p>
                  0{timemin}:{timesec < 10 ? `0${timesec}` : timesec}
                </p>
              </div> : null}
              <div style={{ marginLeft: '16vw', marginTop: '3vh' }}>
                <button
                  type="button"
                  style={{ backgroundColor: 'greenyellow' }}
                  onClick={resendOtp}
                  disabled={timerRunning}
                >
                  {otpcount < 1 ? 'Send OTP' : 'Resend OTP'}
                </button>
              </div>
              <div style={{ marginTop: '3vh' }}>
                <button type="submit">Verify</button>
              </div>
              <div style={{ marginTop: '3vh' }}>
                <p style={{ color: 'green' }}>OTP Successfully Sent to your Mail</p>
              </div>
            </form> : <div>
              {savedata?'Successfully Registered thank you please login ':'Otp Limit Exceeded Try After Some Time Again'}
            </div>
          }
        </div>}
    </div>
  );
}

export default Signup;
