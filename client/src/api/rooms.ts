import {api} from '../'
import {CreateRoomData} from "./types";

export const getAllRooms = () => {
    return api
        .get('/room/getAll')
}

export const createRoom = ({title, userId}: CreateRoomData) => {
    return api
        .post('/room/create', {title, userId})
}

export const removeRoomById = (id: string) => {
    return api
        .delete(`/room/${id}`)
}