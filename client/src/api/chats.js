import { api } from '../'

export const getAllChats = () => {
    return api
        .get('/room/getAll')
}

export const createChat = (query) => {
    return api
        .post('/room/create', query)
}