import axios from 'axios'
import { getAuthToken } from './storage';

const axiosClient = ()=>{
    const token = getAuthToken();
    axios.create({
        baseURL: "http://127.0.0.1:8001", // Set your base URL here
        timeout: 5000, // Optional: Set request timeout
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    });

    axios.defaults.baseURL = "http://127.0.0.1:8001";

    return axios;
};
  
  export default axiosClient;