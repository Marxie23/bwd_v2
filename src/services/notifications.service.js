import axios from 'axios';
import API_URL from "../API/API_URL";
import axiosInstance from "../API/AXIOS_INSTANCE"
import AuthServices from "./auth.service"


const createNotification = (type, content,contentId, recipients, visibleTo,currentUserID)=>{
  return axiosInstance.post(API_URL + 'notification/add',{
    type,
    content,
    contentId,
    recipients,
    visibleTo 
  })
  .then((response)=> {
    return ({message:response.data.message, status:response.data.status,notification: response.data.notification})
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

const getNotification = (id,currentUserID)=>{
  return axiosInstance.get(API_URL + `notification/user/${id}`)
  .then((response)=> {
    return ({message:response.data.message, status:response.data.status,notification: response.data.notifications})
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
    createNotification,
    getNotification
  }