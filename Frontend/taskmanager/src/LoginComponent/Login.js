import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import HttpFunctions from "../HttpComponent/http-common";

function Login(){

  const navigate = useNavigate();
  const [useremail,setUserEmail] = useState("");
  const [userpass,setUserPass] = useState("");
  const [wrongpass,setWrongPass] = useState(false);
  const [noemail,setNoEmail] = useState(false);

  const LoginHandle =async(e) =>{
    e.preventDefault();

    await HttpFunctions.GetUser(useremail)
    .then((response)=>{
      if(response.data?.status ===200){
        if(response.data?.response?.password === userpass){
          localStorage.setItem("firstname",response.data.response.firstname);
          localStorage.setItem("lastname",response.data.response.lastname);
          localStorage.setItem("email",useremail);
          navigate('/home')
        }
        else{
          setWrongPass(true);
        }
      }else{
        setNoEmail(true);
      }
    })


  };

  return (
    <div className={styles.loginbox}>
      <div className={styles.box}>
        <h3>User Login</h3>
      </div>
      <form className={styles.formdiv} onSubmit={LoginHandle}>
        <div>
          <label>Email :</label>
        </div>
        <div>
          <input type="email" id="email" onChange={(e)=>{setUserEmail(e.target.value)}}/>
        </div>
        <div>
          <label>Password :</label>
        </div>
        <div>
          <input type="password" id="password" onChange={(e)=>{setUserPass(e.target.value)}}/>
        </div>
        <div style={{ marginLeft: "14vw" }}>
          <Link to={"/forgotpassword"}>forgot password?</Link>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div style={{ marginLeft: "11.5vw" }}>
          New User <Link to={"/"}>Signup here</Link>
        </div>
        {wrongpass?<p>Wrong Password Please Try Again</p>:null}
        {noemail?<p>Email Not Registered please SignUp</p>:null}
      </form>
    </div>
  );
}

export default Login;
