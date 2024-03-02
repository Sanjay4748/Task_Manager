import { Axios } from "axios";

const baseurl = `http://192.168.1.84:8080/`

const AddUser = (body) =>{
    const result = Axios.post(baseurl+`adduser`,body)
    
}


const Httfunctions = {AddUser}

export default Httfunctions;