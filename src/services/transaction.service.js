
import axios from 'axios';
import API_URL from "../API/API_URL";
import axiosInstance from "../API/AXIOS_INSTANCE"
import AuthServices from "./auth.service"

const createTransaction = (customerId, amountPaid, paymentMethod,status,userId,currentUserID)=>{
  return axiosInstance.post(API_URL + 'transaction/add',{
    customerId, amountPaid, paymentMethod,status,userId
  })
  .then((response)=> {
    return ({message:response.data.message, status:response.data.status})
  }).catch((error) => {
            console.error('Error creating notification:', error);
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
const getTransaction = (currentUserID)=>{
  return axiosInstance.get(API_URL + 'transaction')
  .then((response)=> {
    return ({message:response.data.message, status:response.data.status, transactions: response.data.transactions})
  }).catch((error) => {
            console.error('Error creating notification:', error);
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
const getUserTransaction = (currentUserID)=>{
  return axiosInstance.get(API_URL + `transaction/${currentUserID}`)
  .then((response)=> {
    return ({message:response.data.message, status:response.data.status, transactions: response.data.transactions})
  }).catch((error) => {
            console.error('Error creating notification:', error);
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
    createTransaction,
    getTransaction,
    getUserTransaction
  }