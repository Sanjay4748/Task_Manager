import axios from 'axios';

const baseurl = 'http://192.168.1.66:8080/';

const AddUser = async (body) => {
   try {
    return await axios.post(baseurl + 'adduser', body);
    } catch (err) {
        return err;
    }
};

const SendMail = async (email, body) => {
    try {
        return axios.post(baseurl + `mail/send/${email}`, body);
    } catch (err) {
        return err;
    }
};

const HttpFunctions = { AddUser, SendMail };

export default HttpFunctions;
