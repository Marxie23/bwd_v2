import axios from 'axios';
import API_URL from "../API/API_URL";

import AuthServices from "./auth.service"
const axiosInstance = axios.create({
  withCredentials: true, // Ensure cookies are included with requests
});

const getMeter = (currentUserID) => {
    return axiosInstance.get(API_URL + 'meter')
    .then((response) => {
        return response;
    })
    .catch((error) => {
        console.error('Error fetching customers:', error);
        if (error.status == 403){
            alert("Your session has expired. You will be logged out.");
            AuthServices.logout(currentUserID)
        }
        if(error.status == 401){
            alert(error.response.data.message);
                AuthServices.logout(currentUserID)
            }
        return error;
    });
};

export default {
    getMeter
}