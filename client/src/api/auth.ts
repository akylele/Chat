import {api} from '../'
import {Login, Logout} from "./types";

export const login = ({username, password, socketId}: Login) => {
    return api.post('/auth/login', {username, password, socketId})
}

export const logout = ({userId}: Logout) => {
    return api
        .post('/auth/logout', {userId})
}