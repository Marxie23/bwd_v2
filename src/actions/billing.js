import { CUSTOMER_BILLING_DATA, PAID_BILLING_DATA, SET_BILLING_DATA, UPDATE_BILLING_DATA } from "./types";
import BillingService from '../services/billing.service'

export const getBillingByDate = (year, month,currentUserID) => (dispatch) => {
    return BillingService.getBillingByDate(year, month,currentUserID).then(
        (response) => {
            dispatch({
                type:SET_BILLING_DATA,
                payload: response.data
            });
            return response
        },
        (error) => {
            return error
        }
    );
}
export const getCustomerBillingByDate = (customerID,currentUserID) => (dispatch) => {
    return BillingService.getCustomerBillingByDate(customerID,currentUserID).then(
        (response) => {
            dispatch({
                type:SET_BILLING_DATA,
                payload: response.data
            });
            return response
        },
        (error) => {
            return error
        }
    );
}
export const updateBilling = (id,PaymentDate,PaymentType,AmountPaid, PaymentStatus,currentUserID) => (dispatch) => {
    return BillingService.updateBilling(id,PaymentDate,PaymentType,AmountPaid, PaymentStatus, currentUserID).then(
        (response) => {
            dispatch({
                type:UPDATE_BILLING_DATA,
                payload: response.data
            });
            return response
        },
        (error) => {
            return error
        }
    );
}
export const getCustomerBilling = (customerID,currentUserID) => (dispatch) => {
    return BillingService.getCustomerBilling(customerID,currentUserID).then(
        (response) => {
            dispatch({
                type:CUSTOMER_BILLING_DATA,
                payload: response.data
            });
            return response
        },
        (error) => {
            return error
        }
    );
}

export const getAllPaidBilling = (customerID,currentUserID) => (dispatch) => {
    return BillingService.getAllPaidBilling(customerID,currentUserID).then(
        (response) => {
            dispatch({
                type:PAID_BILLING_DATA,
                payload: response.data
            });
            return response
        },
        (error) => {
            return error
        }
    );
}

export const updateBillings = (id,BillingDate, DueDate, AmountDue, AmountPaid, PaymentStatus, PresentReading, PreviousReading, Consumption,amountAfterDues,fcaCharges,readerNames,currentBills,currentUserID) => (dispatch) => {
    return BillingService.updateBillings(id,BillingDate, DueDate, AmountDue, AmountPaid, PaymentStatus, PresentReading, PreviousReading, Consumption,amountAfterDues,fcaCharges,readerNames,currentBills,currentUserID).then(
        (response) => {
            dispatch({
                type:PAID_BILLING_DATA,
                payload: response.data
            });
            return response
        },
        (error) => {
            return error
        }
    );
}

export const getCustomerBillingByName = (searchValue,currentUserID) => (dispatch) => {
    return BillingService.getCustomerBillingByName(searchValue,currentUserID).then(
        (response) => {
            dispatch({
                type:SET_BILLING_DATA,
                payload: response.data
            });
            return response
        },
        (error) => {
            return error
        }
    );
}