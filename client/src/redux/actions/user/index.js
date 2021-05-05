import {
    LOGIN_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT_ERROR,
    LOGOUT_START,
    LOGOUT_SUCCESS,
} from "../../action-types";

export const loginStart = (username) => ({
    type: LOGIN_START,
    username
})

export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
})

export const loginError = (error) => ({
    type: LOGIN_ERROR,
    error
})

export const logoutStart = (userId) => ({
    type: LOGOUT_START,
    userId
})

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
})

export const logoutError = (error) => ({
    type: LOGOUT_ERROR,
    error
})