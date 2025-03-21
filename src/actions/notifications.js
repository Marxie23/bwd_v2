import { SET_NOTIFICATIONS,ADD_NOTIFICATIONS, PUT_NOTIFICATIONS } from "./types";
import NotificationService from '../services/notifications.service'


export const createNotification = (type, content,contentId, recipients, visibleTo,currentUserID) => (dispatch)=> {
    return NotificationService.createNotification(type, content, contentId, recipients, visibleTo,currentUserID).then(
        (response)=> {
            dispatch({
                type: ADD_NOTIFICATIONS,
                payload: response.data
            });
            return response
        },
        (error)=>{
            return error
        }
    )
}

export const getNotification = (id,currentUserID) => (dispatch)=> {
    return NotificationService.getNotification(id,currentUserID).then(
        (response)=> {
            dispatch({
                type: ADD_NOTIFICATIONS,
                payload: response.data
            });
            return response
        },
        (error)=>{
            return error
        }
    )
}