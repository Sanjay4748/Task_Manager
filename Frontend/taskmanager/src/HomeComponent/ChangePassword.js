import {useEffect, useState } from 'react';
import styles from './Homecomp.module.css';
import HttpFunctions from '../HttpComponent/http-common';
import Validations from '../ValidationsComponent/Validations'

function ChangePassword(){

    const [showotpform,setOtpForm] = useState(true);
    const [useremail,setEmail] = useState("");
    const [userotp,setOtp] = useState("");
    const [verificationotp,setVerificationOtp] = useState("");
    const [successmsg,setSuccessMsg] = useState(true);
    const [oldpassword,setOldPassword] = useState("");
    const [newpassword,setNewPassword] = useState("");
    const [confirmpass,setConfirmPassword] = useState("");
    const [passerror,setShowPassError] = useState(false)
    
    useEffect(()=>{
        const email = localStorage.getItem("email");
        setEmail(email);
    },[])

    var mailobj ={
        "subject":"Otp For Password Verification",
        "message":""
    }

    const ChangePassHandle =async(e) =>{
        e.preventDefault();
        setOtpForm(false);
        await HttpFunctions.SendMail(useremail,mailobj)
        .then((response)=>{
            const otpvalue = response?.data.otp;
            setVerificationOtp(otpvalue);
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    const OtpFormHandle= (e) =>{
        e.preventDefault();
        if(userotp===verificationotp.toString()){
            setSuccessMsg(false);
        }

    }

    const PasswordValidation =(pass)=>{
        const isValid = Validations.PasswordValidation(pass);
        if(isValid){
            setShowPassError(false);
        }
        else{
            setShowPassError(true);
        }
    }

    const Confirmnewpass = () => {
        
    }

    return (
        <div className={styles.changepass}>
            {showotpform?
            <form onSubmit={ChangePassHandle}>
                <div>
                <label>
                    Old password
                </label>
                </div>
                <div>
                <input type='text' id='password' onChange={(e)=>{setOldPassword(e.target.value)}}/>
                </div>
            <div>
                <label>
                    New password
                </label>
            </div>
            <div>
            <input type='password' id='newpass' onChange={(e)=>{setNewPassword(e.target.value)}} onBlur={(e)=>{PasswordValidation(e.target.value)}}/>
            </div>
            <div>
                <label>
                    Confirm New password
                </label>
            </div>
            <div>
            <input type='password' id='confirmpass' onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            </div>
            <div>
                <button type='submit'>
                    sendotp
                </button>
            </div>
            </form>:<div>
                {successmsg?
                <form onSubmit={OtpFormHandle} >
        <div>
        <label>
            Enter Otp
        </label>
        </div>
        <div>
        <input type='text' id='otp' onChange={(e)=>{setOtp(e.target.value)}} />
        </div>
        <div>
       <button type='submit'style={{marginLeft:"0px"}} >
        change password
       </button>
        </div>
    </form>:<div> Password changed Successfully </div>}
</div>}
        </div>
    );
}

export default ChangePassword;