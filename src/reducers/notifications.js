import { SET_NOTIFICATIONS } from "../actions/types";

const initialState ={
    notifications:[]
}

export const getNotificationByUserIdReducer = (state = initialState, action)=>{
    switch(action.type){
        case SET_NOTIFICATIONS:
            return{
                ...state,
                notifications: action.payload
            };
            default: return state;
    }
}