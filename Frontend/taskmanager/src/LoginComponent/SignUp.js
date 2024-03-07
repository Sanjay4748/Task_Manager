import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import Httfunctions from "../HttpComponent/http-common";
import Validations from "../ValidationsComponent/Validations";

function Signup() {
  const [userfirstname, setUserFirstname] = useState("");
  const [userLastname, setUaseLastname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailexist, setEmailExist] = useState(false);
  const [signupdisable, setSignupDisable] = useState(true);
  const [fieldrequired,setFieldRequired] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (userfirstname && userLastname && userEmail && password) {
      setSignupDisable(false);
    } else {
      setSignupDisable(true);
    }
  }, [userfirstname, userLastname, userEmail, password]);

  const SignupHandle = async (e) => {
    e.preventDefault();

    if (userfirstname !== "" && userLastname !== "" && userEmail !== "" && password !== "") {
      var signupobj = {
        firstname: userfirstname,
        lastname: userLastname,
        email: userEmail,
        password: password,
      };

      await Httfunctions.GetUser(userEmail)
      .then((response)=>{
          console.log(response.data);
          if(response.data.status ===400){
            navigate("/verifyuser",{state:{email:userEmail}});
          }else if(response.data.status ===200){
            setEmailExist(true);
          }
      })
      .catch((err)=>{
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

  const EmailHandle =(e) =>{
    const isvalid = Validations.EmailValidation(e.target.value);
    if(isvalid){
      setFieldRequired(false);
    }else{
      setFieldRequired(true);
    }
  }

  return (
    <div className={styles.loginbox} style={{ height: "55vh" }}>
      <div className={styles.box}>
        <h3>User Login</h3>
      </div>
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
            onBlur={(e)=>{EmailHandle(e)}}
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
              setPassword(e.target.value);
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
      {fieldrequired?<span style={{display:"flex",justifyContent:"center",color:"red"}} >*Incorrect Input</span>:null}
    </div>
  );
}

export default Signup;
