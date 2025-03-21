import API_URL from "../API/API_URL";
import axiosInstance from "../API/AXIOS_INSTANCE"
import AuthServices from "./auth.service"

const getUsers = (currentUser,currentUserID) => {
    return axiosInstance.get(API_URL + `users/${currentUser}`)
    .then((response) => {
        return({
            message:response.data.message,
            status:response.data.status,
            users: response.data.users
        })
    })
    .catch((error) => {
        console.error('Error fetching meter reading:', error);
        if (error.status === 403){
            alert("Your session has expired. You will be logged out.");
            AuthServices.logout(currentUserID)
        }
        if(error.status === 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error.response.data;
    })
}
const addUser = (userLastname,userFirstname,userMiddlename,username,email,password,userType,currentUserID) => {
    return axiosInstance.post(API_URL + 'users/add',{
        userLastname,
        userFirstname,
        userMiddlename,
        username,
        email,
        password,
        userType
    })
    .then((response)=> {
        console.log(response)
        return ({message:response.data.message, status:response.data.status});
    })
    .catch((error) => {
        console.error(error)
            if (error.status === 403){
                AuthServices.logout(currentUserID)
            }
            if(error.status === 401){
                alert(error.response.data.message);
                AuthServices.logout(currentUserID)
            }
            return error.response.data;
        });
}

const changePicture = (formData,currentUserID) => {
    return axiosInstance.post(API_URL + `user/profile/${currentUserID}`,formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => {
        return response.data;
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
    });
}
const getUserInfo = (currentUser,currentUserID) => {
    return axiosInstance.get(API_URL + `user/profile/${currentUser}`)
    .then((response) => {
        return({
            message:response.data.message,
            status:response.data.status,
            users: response.data.user
        })
    })
    .catch((error) => {
        console.error('Error fetching meter reading:', error);
        if (error.status === 403){
            alert("Your session has expired. You will be logged out.");
            AuthServices.logout(currentUserID)
        }
        if(error.status === 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error.response.data;
    })
}

const changePassword = (username,newPassword,password,userId,currentUserID) => {
    return axiosInstance.post(API_URL + `user/profile`,{
        userId,
        password,
        newPassword,
        username
    })
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error('Error updating user:', error);
        if (error.status === 403){
            alert("Your session has expired. You will be logged out.");
            AuthServices.logout(currentUserID)
        }
        if(error.status === 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error.response.data;
    });
}
export default {
    getUsers,
    addUser,
    changePicture,
    getUserInfo,
    changePassword
}