import axios from 'axios';
import API_URL from "../API/API_URL";
import axiosInstance from "../API/AXIOS_INSTANCE"
// Axios instance to set credentials for cookies
// const axiosInstance = axios.create({
//   withCredentials: true, // Ensure cookies are included with requests
// });

// Register function
const register = (username, email, password, accessType, picturePath) => {
  return axiosInstance.post(API_URL + 'signup', {
    username,
    email,
    password,
    accessType,
    picturePath,
  });
};

// Login function
const login = (username, password) => {
  return axiosInstance.post(API_URL + 'signin', {
    username,
    password,
  }).then((response) => {
    // Store the user object without the token, as the token is in the cookie
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return {data: response.data};
  }).catch((error)=>{
    console.log(error.response.data)
    return {data: error.response.data}
  });
};
// Logout function
const logout = (userId) => {
  axiosInstance.post(API_URL+ 'logout',{
    userId
  }).then((response) => {
    localStorage.removeItem('user');
    window.location.reload()
  }).catch((error)=>{
    localStorage.removeItem('user');
    console.error(error)
  })
};

export default {
  register,
  login,
  logout,
};
