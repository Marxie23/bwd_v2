import axios from 'axios';
// Axios instance to set credentials for cookies
const axiosInstance = axios.create({
    withCredentials: true, // Ensure cookies are included with requests
    
  });

  export default axiosInstance