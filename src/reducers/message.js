import { SET_MESSAGE } from "../actions/types"

const initialState = {
    message: [],
}

const messageReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_MESSAGE:
            return{
                ...state,
                message: [...action.payload],
            };
            default: return state;
    }
    // const { type, payload } = action

    // switch (type) {
    //     case SET_MESSAGE:
    //         return { message: payload }
    //     case CLEAR_MESSAGE:
    //         return { message: '' }
    //     default:
    //         return state
    // }
}

export default messageReducer;