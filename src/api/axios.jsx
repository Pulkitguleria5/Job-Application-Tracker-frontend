import axios from 'axios';

 const axiosinstance = axios.create({
    baseURL: 'http://localhost:5002', // Base URL for your backend API
    withCredentials: true, // Include cookies in requests
});

export default axiosinstance;





