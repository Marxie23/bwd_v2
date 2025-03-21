import axios from 'axios';
import API_URL from "../API/API_URL";
import axiosInstance from "../API/AXIOS_INSTANCE"
import AuthServices from "./auth.service"


const createNotification = (type, content, contentId, to, isRead, isRemoved, customerId,currentUserID)=>{
  return axiosInstance.post(API_URL + 'notifications',{
    type,
    content,
    contentId,
    to,
    isRead,
    isRemoved,
    customerId,
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

const getNotificationByUserId = (customerId,currentUserID) => {
  return axiosInstance.get(API_URL + `notifications/${customerId}`)
  .then((response)=> {
    return({
      message:response.data.message,
      status:response.data.status,
      notifications: response.data.notifications
    })
  })
  .catch((error)=> {
    console.error('Error creating notification:', error);
            if (error.status === 403){
                alert("Your session has expired. You will be logged out.");
                AuthServices.logout(currentUserID)
            }
            if(error.status === 401){
                alert(error.response.data.message);
                AuthServices.logout(currentUserID)
            }
            return ({message:error.response.data.message,status:error.response.data.status,notifications:error.response.data.notifications})
  })
}

const updateNotificationById = (notificationID,currentUserID) => {
  return axiosInstance.put(API_URL + `notifications/${notificationID}`)
  .then((response)=> {
    return({
      message:response.data.message,
      status:response.data.status,
      notifications: response.data.notification
    })
  })
  .catch((error)=> {
    console.error('Error creating notification:', error);
            if (error.status === 403){
                alert("Your session has expired. You will be logged out.");
                AuthServices.logout(currentUserID)
            }
            if(error.status === 401){
                alert(error.response.data.message);
                AuthServices.logout(currentUserID)
            }
            return ({message:error.response.data.message,status:error.response.data.status,notifications:error.response.data.notifications})
  })
}

const deleteNotificationById = (notificationID,currentUserID) => {
  return axiosInstance.delete(API_URL + `notifications/${notificationID}`)
  .then((response)=> {
    return({
      message:response.data.message,
      status:response.data.status,
    })
  })
  .catch((error)=> {
    console.error('Error creating notification:', error);
            if (error.status === 403){
                alert("Your session has expired. You will be logged out.");
                AuthServices.logout(currentUserID)
            }
            if(error.status === 401){
                alert(error.response.data.message);
                AuthServices.logout(currentUserID)
            }
            return ({message:error.response.data.message,status:error.response.data.status,notifications:error.response.data.notifications})
  })
}

export default {
  createNotification,
  getNotificationByUserId,
  updateNotificationById,
  deleteNotificationById
}