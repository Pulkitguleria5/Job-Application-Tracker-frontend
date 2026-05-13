import axios from 'axios';

 const axiosinstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Base URL for your backend API
    withCredentials: true, // Include cookies in requests
});

export default axiosinstance;





