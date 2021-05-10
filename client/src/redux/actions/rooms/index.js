import {
    CREATE_ROOM_START,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_ERROR,
    LOAD_ROOMS_START,
    LOAD_ROOMS_SUCCESS,
    LOAD_ROOMS_ERROR,
    SET_ACTIVE_ROOM,
    SET_FILTERED_ROOMS,
    LOAD_ROOM_BY_ID_START,
    LOAD_ROOM_BY_ID_SUCCESS,
    LOAD_ROOM_BY_ID_ERROR,
    NEW_USERS_FOR_ROOM,
    DELETE_ROOM_START, DELETE_ROOM_SUCCESS, DELETE_ROOM_ERROR, NEW_MESSAGES_FOR_ROOM
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

export const loadRoomsError = () => ({
    type: LOAD_ROOMS_ERROR,
})

export const deleteRoomStart = (id) => ({
    type: DELETE_ROOM_START,
    id
})

export const deleteRoomSuccess = () => ({
    type: DELETE_ROOM_SUCCESS
})

export const deleteRoomError = () => ({
    type: DELETE_ROOM_ERROR,
})

export const loadRoomByIdStart = (id) => ({
    type: LOAD_ROOM_BY_ID_START,
    id
})

export const loadRoomByIdSuccess = (payload) => ({
    type: LOAD_ROOM_BY_ID_SUCCESS,
    payload
})

export const loadRoomByIdError = () => ({
    type: LOAD_ROOM_BY_ID_ERROR,
})

export const createRoomStart = (data) => ({
    type: CREATE_ROOM_START,
    payload: data
})

export const createRoomSuccess = () => ({
    type: CREATE_ROOM_SUCCESS,
})

export const createRoomError = () => ({
    type: CREATE_ROOM_ERROR
})

export const newUsersForRoom = (payload) => ({
    type: NEW_USERS_FOR_ROOM,
    payload
})

export const newMessagesForRoom = (payload) => ({
    type: NEW_MESSAGES_FOR_ROOM,
    payload
})