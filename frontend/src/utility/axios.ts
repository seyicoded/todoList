import axios from 'axios'
import { getAuthToken } from './storage';

const axiosClient = ()=>{
    let token = getAuthToken();
    axios.create({
        baseURL: "http://127.0.0.1:8001", // Set your base URL here
        timeout: 5000, // Optional: Set request timeout
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    });

    if(token){
        token = token.replace("\"", "");
        token = token.replace("\"", "");
    }

    console.log(token, "tokentoken")
    axios.defaults.baseURL = "http://127.0.0.1:8001";
    axios.defaults.headers.get.Authorization = `Bearer ${token}`;
    axios.defaults.headers.post.Authorization = `Bearer ${token}`;
    axios.defaults.headers.delete.Authorization = `Bearer ${token}`;
    axios.defaults.headers.patch.Authorization = `Bearer ${token}`;
    axios.defaults.headers.put.Authorization = `Bearer ${token}`;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    return axios;
};
  
  export default axiosClient;