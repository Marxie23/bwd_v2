import axios from 'axios';
import API_URL from "../API/API_URL";

import AuthServices from "./auth.service"
// Axios instance to set credentials for cookies
const axiosInstance = axios.create({
  withCredentials: true, // Ensure cookies are included with requests
});

// Fetch customer data
const addCustomer = (accountNum, firstName, middleName, lastName, contactNum, meterNumber, address, installationDate,email,currentUserID) => {
    return axiosInstance.post(API_URL + 'customer/add',{
        accountNum,
        firstName,
        middleName,
        lastName,
        contactNum,
        meterNumber,
        address,
        installationDate,
        email
    })
    .then((response) => {
        return ({message:response.data.message, status:response.data.status});
    })
    .catch((error) => {
        if (error.status == 403){
            AuthServices.logout(currentUserID)
        }
        if(error.status == 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error.response.data;
    });
};
const getCustomer = (currentUserID) => {
    return axiosInstance.get(API_URL + 'customer')
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

const getCustomerById = (id,currentUserID) => {
    return axiosInstance.get(API_URL + `customer/${id}`)
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

const updateCustomer = (id,accountNum, firstName, middleName, lastName, contactNum, meterNumber, address, installationDate,email,currentUserID) => {
    return axiosInstance.put(API_URL + `customer/${id}`,{
        accountNum,
        firstName,
        middleName,
        lastName,
        contactNum,
        meterNumber,
        address,
        installationDate,
        email
    })
    .then((response) => {
        return ({message:response.data.message, status:response.data.status});
    })
    .catch((error) => {
        if (error.status == 403){
            AuthServices.logout(currentUserID)
        }
        if(error.status == 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error.response.data;
    });
};
const deleteCustomer = (id,currentUserID) => {
    return axiosInstance.delete(API_URL + `customer/${id}`)
    .then((response) => {
        return ({message:response.data.message, status:response.data.status});
    })
    .catch((error) => {
        if (error.status == 403){
            AuthServices.logout(currentUserID)
        }
        if(error.status == 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error.response.data;
    });
};

export default {
    addCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};