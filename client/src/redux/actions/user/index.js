import {
    LOGIN_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT_ERROR,
    LOGOUT_START,
    LOGOUT_SUCCESS,
} from "../../action-types";

export const loginStart = (data) => ({
    type: LOGIN_START,
    data
})

export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
})

export const loginError = () => ({
    type: LOGIN_ERROR,
})

export const logoutStart = (userId) => ({
    type: LOGOUT_START,
    userId
})

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
})

export const logoutError = () => ({
    type: LOGOUT_ERROR,
})