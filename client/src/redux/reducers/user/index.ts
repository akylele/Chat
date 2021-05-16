import {LOGIN_ERROR, LOGIN_START, LOGIN_SUCCESS, LOGOUT_ERROR, LOGOUT_START, LOGOUT_SUCCESS} from "../../action-types";
import {ActionUser} from "../types";

const initialState = {
    name: null,
    userId: null,
    socketId: null,
    loading: false
}

export default function userReducer(state = initialState, action: ActionUser) {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...initialState,
                loading: true
            }
        case LOGOUT_START:
            return {
                ...state,
                loading: true
            }
        case LOGOUT_SUCCESS:
            return {
                ...initialState,
                loading: false
            }
        case LOGOUT_ERROR:
            return {
                ...state,
                loading: false
            }
        case LOGIN_SUCCESS:
            return {
                ...action.loginData,
                loading: false
            }
        case LOGIN_ERROR:
            return {
                ...initialState,
            }
        default:
            return state
    }
}