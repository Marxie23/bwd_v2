import axios from 'axios';
import API_URL from "../API/API_URL";

import AuthServices from "./auth.service"
const axiosInstance = axios.create({
  withCredentials: true, // Ensure cookies are included with requests
});

const createMeterReading = (penalty,periodStart, periodEnd, readingDate, presentReading, previousReading, consumption,meterId,customerId, amountDue, amountAfterDue, dueDate,fcaCharge,readerName,currentBill,currentUserID) => {
    return axiosInstance.post(API_URL + 'meterReading/add',{
        penalty,
        periodStart,
        periodEnd,
        readingDate,
        presentReading,
        previousReading,
        consumption,
        meterId,
        customerId,
        amountDue,
        amountAfterDue,
        fcaCharge,
        readerName,
        currentBill,
        dueDate
    })
    .then((response) => {
        return ({message:response.data.message, status:response.data.status,meterReading: response.data.meterReading});
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
};

const getMeterReadingByDateAndMeterID = (year, month, meterId,currentUserID) => {
    return axiosInstance.get(API_URL + `meterReading/${year}/${month}/${meterId}`)
    .then((response) => {
        return ({
            message:response.data.message,
            status:response.data.status,
            readings: response.data.meterReadings
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

const getMeterReadingByDate = (year, month,currentUserID) => {
    return axiosInstance.get(API_URL + `meterReading/${year}/${month}`)
    .then((response) => {
        return ({
            message:response.data.message,
            status:response.data.status,
            readings: response.data.billings
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

const updateMeterReadings = (id,periodStart, periodEnd, readingDate, presentReading, previousReading, consumption,meterId,customerId, amountDue, amountAfterDue, dueDate,currentUserID) => {
    return axiosInstance.put(API_URL + `meterReading/${id}`,{
        periodStart,
        periodEnd,
        readingDate,
        presentReading,
        previousReading,
        consumption,
        meterId,
        customerId,
        amountDue,
        amountAfterDue,
        dueDate
    })
    .then((response) => {
        return ({
            message:response.data.message,
            status:response.data.status,
            meterReading:response.data.meterReading});
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
};

export default {
    createMeterReading,
    getMeterReadingByDate,
    getMeterReadingByDateAndMeterID,
    updateMeterReadings
}