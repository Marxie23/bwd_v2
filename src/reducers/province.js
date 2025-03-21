import {
    PROVINCE_DATA
  } from "../actions/types";

const initialState = {
    province: [],
};

const provinceReducer = (state = initialState, action) => {
    switch(action.type){
        case PROVINCE_DATA:
            return{
                ...state,
                province: [...action.payload],
            };
        default: return state;
    }
};


export default provinceReducer;