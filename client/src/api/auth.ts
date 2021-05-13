import {api} from '../'
import {ILoginData, ILogoutData} from "./types";

export const login = ({username, password, socketId}: ILoginData) => {
    return api.post('/auth/login', {username, password, socketId})
}

export const logout = ({userId}: ILogoutData) => {
    return api
        .post('/auth/logout', {userId})
}