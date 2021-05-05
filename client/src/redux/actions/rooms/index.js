import {
    CREATE_ROOM_START,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_ERROR,
    LOAD_ROOMS_START,
    LOAD_ROOMS_SUCCESS,
    LOAD_ROOMS_ERROR,
    SET_ACTIVE_ROOM,
    SET_FILTERED_ROOMS
} from "../../action-types";

export const setActiveRoom = activeRoom => ({
    type: SET_ACTIVE_ROOM,
    payload: activeRoom
})

export const setFilteredRooms = filteredRooms => ({
    type: SET_FILTERED_ROOMS,
    payload: filteredRooms
})

export const loadRoomsStart = () => ({
    type: LOAD_ROOMS_START,
})

export const loadRoomsSuccess = (payload) => ({
    type: LOAD_ROOMS_SUCCESS,
    payload
})

export const loadRoomsError = (error) => ({
    type: LOAD_ROOMS_ERROR,
    error
})

export const createRoomStart = (title) => ({
    type: CREATE_ROOM_START,
    title
})

export const createRoomSuccess = () => ({
    type: CREATE_ROOM_SUCCESS,
})

export const createRoomError = (error) => ({
    type: CREATE_ROOM_ERROR,
    error
})