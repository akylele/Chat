import { api } from '../'

export const login = query => {
    return api
        .post('/auth/login', query)
}

export const logout = query => {
    return api
        .post('/auth/logout', query)
}