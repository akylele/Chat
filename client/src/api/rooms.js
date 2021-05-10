import {api} from '../'

export const getAllRooms = () => {
    return api
        .get('/room/getAll')
}

export const createRoom = (query) => {
    return api
        .post('/room/create', query)
}

export const getRoomById = (id) => {
    return api
        .get(`/room/${id}`)
}

export const removeRoomById = (id) => {
    return api
        .delete(`/room/${id}`)
}