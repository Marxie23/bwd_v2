import { SET_NOTIFICATIONS,ADD_NOTIFICATIONS, PUT_NOTIFICATIONS } from "./types";
import NotificationService from '../services/notification.service'


export const createNotification = (type, content, contentId, to, isRead, isRemoved, customerId,currentUserID) => (dispatch)=> {
    return NotificationService.createNotification(type, content, contentId, to, isRead, isRemoved, customerId,currentUserID).then(
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

export const getNotificationByUserId = (customerId,currentUserID)=> (dispatch)=> {
    return NotificationService.getNotificationByUserId(customerId,currentUserID).then(
        (response)=>{
            dispatch({
                type: SET_NOTIFICATIONS,
                payload: response.notifications
            });
            return response
        },
        (error)=> {
            return error
        }
    )
}

export const updateNotificationById = (notificationID,currentUserID)=> (dispatch)=> {
    return NotificationService.updateNotificationById(notificationID,currentUserID).then(
        (response)=>{
            dispatch({
                type: PUT_NOTIFICATIONS,
                payload: response.notifications
            });
            return response
        },
        (error)=> {
            return error
        }
    )
}

export const deleteNotificationById = (notificationID,currentUserID)=> (dispatch)=> {
    return NotificationService.deleteNotificationById(notificationID,currentUserID).then(
        (response)=>{
            dispatch({
                type: PUT_NOTIFICATIONS,
                payload: []
            });
            return response
        },
        (error)=> {
            return error
        }
    )
}