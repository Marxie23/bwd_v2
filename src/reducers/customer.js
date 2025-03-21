import {
    ADD_CUSTOMER,
    SET_CUSTOMER
  } from "../actions/types";

const initialState = {
    customer:'',
};
const initialStateCustomer = {
    customers:[],
};

export const addCustomerReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_CUSTOMER:
            return{
                ...state,
                customer: action.payload,
            };
        default: return state;
    }
};
export const getCustomerReducer = (state = initialStateCustomer, action) => {
    switch(action.type){
        case SET_CUSTOMER:
            return{
                ...state,
                customers: action.payload,
            };
        default: return state;
    }
};
