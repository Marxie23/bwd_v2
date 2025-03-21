import { ADD_CUSTOMER, GET_CUSTOMER, SET_CUSTOMER, UPDATE_CUSTOMER } from "./types";

import CustomerService from '../services/customer.service'

export const addCustomer = (accountNum, firstName, middleName, lastName, contactNum,meterNumber, address, installationDate,email,currentUserID) => (dispatch) => {
    return CustomerService.addCustomer(accountNum, firstName, middleName, lastName, contactNum, meterNumber, address, installationDate,email,currentUserID).then(
        (response) => {
            dispatch({
                type: ADD_CUSTOMER,
                payload: response.data
            });
            return response
        },
        (error) => {
            return error
        }
    );
}
export const getCustomer = (currentUserID) => (dispatch) => {
    return CustomerService.getCustomer(currentUserID).then(
        (response) => {
            dispatch({
                type: SET_CUSTOMER,
                payload: response.data.customers
            });
            return response.data
        },
        (error) => {
            return error
        }
    );
}

export const getCustomerById = (id,currentUserID) => (dispatch) => {
    return CustomerService.getCustomerById(id,currentUserID).then(
        (response) => {
            dispatch({
                type: GET_CUSTOMER,
                payload: response.data.customer
            });
            return response.data
        },
        (error) => {
            return error
        }
    );
}

export const updateCustomer = (id,accountNum, firstName, middleName, lastName, contactNum,meterNumber, address, installationDate,email,currentUserID) => (dispatch) => {
    return CustomerService.updateCustomer(id,accountNum, firstName, middleName, lastName, contactNum, meterNumber, address, installationDate,email,currentUserID).then(
        (response) => {
            dispatch({
                type: UPDATE_CUSTOMER,
                payload: response.data
            });
            return response
        },
        (error) => {
            return error
        }
    );
}

export const deleteCustomer = (id,currentUserID) => (dispatch) => {
    return CustomerService.deleteCustomer(id,currentUserID).then(
        (response) => {
            dispatch({
                type: UPDATE_CUSTOMER,
                payload: response.data
            });
            return response
        },
        (error) => {
            return error
        }
    );
}