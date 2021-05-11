import {LOGIN_ERROR, LOGIN_START, LOGIN_SUCCESS, LOGOUT_ERROR, LOGOUT_START, LOGOUT_SUCCESS,} from "../../action-types";
import {Login, UserLogin} from "../../../api/types";

export const loginStart = (payload: Login) => ({
    type: LOGIN_START,
    payload
})

export const loginSuccess = (loginData: UserLogin) => ({
    type: LOGIN_SUCCESS,
    loginData
})

export const loginError = () => ({
    type: LOGIN_ERROR,
})

export const logoutStart = (userId: string) => ({
    type: LOGOUT_START,
    userId
})

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
})

export const logoutError = () => ({
    type: LOGOUT_ERROR,
})