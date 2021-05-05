import { api } from '../'

export const getAllRooms = () => {
    return api
        .get('/room/getAll')
}

export const createRoom = (query) => {
    return api
        .post('/room/create', query)
}