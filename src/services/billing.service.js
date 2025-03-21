import API_URL from "../API/API_URL";
import axiosInstance from "../API/AXIOS_INSTANCE"
import AuthServices from "./auth.service"

const getBillingByDate = (year, month, currentUserID) => {
    return axiosInstance.get(API_URL + `billing/${year}/${month}`)
    .then((response) => {
        return ({
            message:response.data.message,
            status:response.data.status,
            billingInfo: response.data.billingInfo
        })
    })
    .catch((error) => {
        console.log('Error fetching meter reading:', error);
        if (error.status === 403){
            alert(`${error.response.data.message}. You will be logged out.`);
            AuthServices.logout(currentUserID)
        }
        if(error.status === 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error.response.data;
    })
}
const getCustomerBillingByDate = (year, month,customerID, currentUserID) => {
    return axiosInstance.get(API_URL + `billing/${year}/${month}/${customerID}`)
    .then((response) => {
        return ({
            message:response.data.message,
            status:response.data.status,
            billingInfo: response.data.billingInfo
        })
    })
    .catch((error) => {
        console.log('Error fetching meter reading:', error);
        if (error.status === 403){
            alert(`${error.response.data.message}. You will be logged out.`);
            AuthServices.logout(currentUserID)
        }
        if(error.status === 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error.response.data;
    })
}
const updateBilling = (id,PaymentStatus, currentUserID) => {
    return axiosInstance.put(API_URL + `billing/${id}`,{
        PaymentStatus
    })
    .then((response)=> {
        return response
    })
    .catch((error) => {
        console.log('Error fetching meter reading:', error);
        if (error.status === 403){
            alert(`${error.response.data.message}. You will be logged out.`);
            AuthServices.logout(currentUserID)
        }
        if(error.status === 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error.response.data;
    })
}
const getCustomerBilling = (customerID, currentUserID) => {
    return axiosInstance.get(API_URL + `history/${customerID}`)
    .then((response) => {
        return ({
            message:response.data.message,
            status:response.data.status,
            billingInfo: response.data.billingInfo
        })
    })
    .catch((error) => {
        console.log('Error fetching meter reading:', error);
        if (error.status === 403){
            alert(`${error.response.data.message}. You will be logged out.`);
            AuthServices.logout(currentUserID)
        }
        if(error.status === 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error.response.data;
    })
}
const getAllPaidBilling = (customerID, currentUserID) => {
    return axiosInstance.get(API_URL + `history`)
    .then((response) => {
        return ({
            message:response.data.message,
            status:response.data.status,
            billingInfo: response.data.billingInfo
        })
    })
    .catch((error) => {
        console.log('Error fetching meter reading:', error);
        if (error.status === 403){
            alert(`${error.response.data.message}. You will be logged out.`);
            AuthServices.logout(currentUserID)
        }
        if(error.status === 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error.response.data;
    })
}
const sendReminder = (customerID, currentUserID) => {
    return axiosInstance.post(API_URL + `reminder`)
    .then((response) => {
        return ({
            message:response.data.message,
            status:response.data.status,
        })
    })
    .catch((error) => {
        console.log('Error fetching meter reading:', error);
        if (error.status === 403){
            alert(`${error.response.data.message}. You will be logged out.`);
            AuthServices.logout(currentUserID)
        }
        if(error.status === 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error.response.data;
    })
}

const updateBillings = (id,BillingDate, DueDate, AmountDue, AmountPaid, PaymentStatus, PresentReading, PreviousReading, Consumption,amountAfterDues,currentUserID) => {
    return axiosInstance.post(API_URL + `billing/${id}`,{
        BillingDate, DueDate, AmountDue, AmountPaid, PaymentStatus, PresentReading, PreviousReading, Consumption,amountAfterDues  
    })
    .then((response)=> {
        return response
    })
    .catch((error) => {
        console.log('Error fetching meter reading:', error);
        if (error.status === 403){
            alert(`${error.response.data.message}. You will be logged out.`);
            AuthServices.logout(currentUserID)
        }
        if(error.status === 401){
            alert(error.response.data.message);
            AuthServices.logout(currentUserID)
        }
        return error.response.data;
    })
}
export default {
    getBillingByDate,
    getCustomerBillingByDate,
    updateBilling,
    getCustomerBilling,
    getAllPaidBilling,
    sendReminder,
    updateBillings
}