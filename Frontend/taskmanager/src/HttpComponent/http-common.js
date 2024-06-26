import axios from 'axios';

const baseurl = 'http://localhost:8080';

const GetUser = async (email) =>{
    try{
        return await axios.get(baseurl+`/user/${email}`);
    }catch(err){
        return err;
    }
}

const AddUser = async (body) => {
   try {
    return await axios.post(baseurl + '/adduser', body);
    } catch (err) {
        return err;
    }
};

const SendMail = async (email, body) => {
    try {
        return axios.post(baseurl + `/mail/send/${email}`, body);
    } catch (err) {
        return err;
    }
};

const ChangePass = async (email,newpassword) =>{
    try{
        return axios.post(baseurl + `/user/changepassword`,null,{params:{
            "email":email,
            "newpassword":newpassword
        }});
    }catch(err){
        return err;
    }
}

const Gettasks = async ()=>{
    try{
        return axios.get(baseurl+`/task/alltasks`);
    }catch(err){
        return err;
    }
}

const HttpFunctions = { AddUser, SendMail, GetUser,ChangePass,Gettasks};

export default HttpFunctions;
