import {combineReducers} from 'redux'
import auth from './auth'
import messageReducer from './message'
import provinceReducer from './province'
import {addCustomerReducer,getCustomerReducer} from './customer'
import { getNotificationByUserIdReducer } from './notifications'

export default combineReducers({
    auth,
    message: messageReducer,
    province: provinceReducer,
    customer: addCustomerReducer,
    customers: getCustomerReducer,
    notifications: getNotificationByUserIdReducer
})