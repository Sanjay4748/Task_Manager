import { useEffect, useState } from "react";
import styles from "./Homecomp.module.css";
import HttpFunctions from "../HttpComponent/http-common";
import Validations from "../ValidationsComponent/Validations";

function ChangePassword() {
  const [showotpform, setOtpForm] = useState(true);
  const [useremail, setEmail] = useState("");
  const [userpass,setPass] = useState("");
  const [userotp, setOtp] = useState("");
  const [verificationotp, setVerificationOtp] = useState("");
  const [successmsg, setSuccessMsg] = useState(true);
  const [oldpassword, setOldPassword] = useState("");
  const [enableotp,setEnableOtp] = useState(true);
  const [newpassword, setNewPassword] = useState("");
  const [confirmpass, setConfirmPassword] = useState("");
  const [passerror, setShowPassError] = useState(false);
  const [passsamemsg,setPassSameMsg] = useState(false);
  const [passnotsamemsg,setPassNotSameMsg] = useState(false);
  const [passnotchanged,setPassNotChanged] = useState(false);
  const [oldpassnotmatching,setOldPassNotMatching] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const pass = localStorage.getItem("password");
    setPass(pass);
    setEmail(email);
  }, []);

  useEffect(() => {
    if (oldpassword === userpass) {
      setEnableOtp(false);
    } else {
      setEnableOtp(true);
      if(oldpassword !==""){
        setOldPassNotMatching(true);
      }
    }

    if(newpassword === confirmpass && confirmpass!==null){
        setPassNotSameMsg(false)
    }else{
        setPassNotSameMsg(true)
    }

    if(oldpassword === newpassword && oldpassword!=="" ){
        setPassSameMsg(true);
        setEnableOtp(false);
    }else{
        setPassSameMsg(false);
    }
  }, [oldpassword, userpass, newpassword, confirmpass]);
  

  const ChangePassHandle = async (e) => {
    var mailobj = {
        subject: "Otp For Password Verification",
        message: "",
      };
    
    e.preventDefault();
    setOtpForm(false);
    await HttpFunctions.SendMail(useremail, mailobj)
      .then((response) => {
        const otpvalue = response?.data.otp;
        setVerificationOtp(otpvalue);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const OtpFormHandle = async(e) => {
    e.preventDefault();
    if (userotp === verificationotp.toString()) {
        await HttpFunctions.ChangePass(useremail,newpassword)
        .then((response)=>{
            if(response.data.status === 200){
                setSuccessMsg(false);
                localStorage.setItem("password",newpassword)
            }else{
                setPassNotChanged(true);
            }
        })
        .catch((err)=>{
            console.error(err);
        })
    }else{
        setPassNotChanged(true);
    }
  };

  const PasswordValidation = (pass) => {
    const isValid = Validations.PasswordValidation(pass);
    if (isValid) {
      setShowPassError(false);
    } else {
      setShowPassError(true);
    }
  };

  return (
    <div className={styles.changepass}>
      {showotpform ? (
        <form onSubmit={ChangePassHandle}>
          <div>
            <label>Old password</label>
          </div>
          <div>
            <input
              type="text"
              id="password"
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              onBlur={(e)=>{}}
            />
          </div>
          {oldpassnotmatching?<p>Old Password Not Matching Logout And Try Again</p>:null}
          <div>
            <label>New password</label>
          </div>
          <div>
            <input
              type="password"
              id="newpass"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              onBlur={(e) => {
                PasswordValidation(e.target.value);
              }}
            />
          </div>
          {passsamemsg?<p>New Password Should not be same as old password</p>:null}
          {passerror?<p>
                password should contain one capital and no spaces 
          </p>:null}
          <div>
            <label>Confirm New password</label>
          </div>
          <div>
            <input
              type="password"
              id="confirmpass"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          {passnotsamemsg?<p>confirm password is not matching</p>:null}
          <div>
            <button type="submit" disabled={enableotp} >
                sendotp
                </button>
          </div>
        </form>
      ) : (
        <div>
          {successmsg ? (
            <form onSubmit={OtpFormHandle}>
              <div>
                <label>Enter Otp</label>
              </div>
              <div>
                <input
                  type="text"
                  id="otp"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
              </div>
              <div>
                <button type="submit" style={{ marginLeft: "0px" }}>
                  change password
                </button>
              </div>
              {passnotchanged?<p>Password Not Changed Try Again</p>:null}
            </form>
          ) : (
            <div> Password changed Successfully </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
