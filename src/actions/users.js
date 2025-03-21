import { ADD_USER, GET_USER, GET_USERS } from "./types";

import UserService from '../services/user.service'

export const getUsers = (currentUser,currentUserId) => (dispatch) => {
    return UserService.getUsers(currentUser,currentUserId).then(
        (response) => {
            dispatch({
                type: GET_USERS,
                payload: response.users
            });
            return response
        },
        (error) => {
            return error
        }
    );
}

export const addUser = (userLastname,userFirstname,userMiddlename,username,email,password,userType,currentUserID) => (dispatch) => {
    return UserService.addUser(userLastname,userFirstname,userMiddlename,username,email,password,userType,currentUserID).then(
        (response) => {
            dispatch({
                type: ADD_USER,
                payload: response
            });
            return response
        },
        (error) => {
            return error
        }
    );
}

export const getUserInfo = (currentUser,currentUserID) => (dispatch) => {
    return UserService.getUserInfo(currentUser,currentUserID).then(
        (response) => {
            dispatch({
                type: GET_USER,
                payload: response
            });
            return response
        },
        (error) => {
            return error
        }
    );
}

export const changePassword = (username,newPassword,password,userId,currentUserID) => (dispatch) => {
    return UserService.changePassword(username,newPassword,password,userId,currentUserID).then(
        (response) => {
            dispatch({
                type: GET_USER,
                payload: response
            });
            return response
        },
        (error) => {
            return error
        }
    );
}