import axios from 'axios';
import API_URL from "../API/API_URL";
import axiosInstance from "../API/AXIOS_INSTANCE"
import AuthServices from "./auth.service"

const makePayment = (BillingID,currentUserID) => {
    return axiosInstance.post(API_URL + 'payment',{
        BillingID
    })
    .then((response)=> {
        return ({url: response.data.url})
    })
    .catch((error) => {
                console.error('Error fetching customers:', error);
                if (error.status === 403){
                    alert("Your session has expired. You will be logged out.");
                    AuthServices.logout(currentUserID)
                }
                if(error.status === 401){
                    alert(error.response.data.message);
                    AuthServices.logout(currentUserID)
                }
                return error;
    })
}
export default {
    makePayment
  }