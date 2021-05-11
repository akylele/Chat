import {
    CREATE_ROOM_ERROR,
    CREATE_ROOM_START,
    CREATE_ROOM_SUCCESS,
    DELETE_ROOM_ERROR,
    DELETE_ROOM_START,
    DELETE_ROOM_SUCCESS,
    LOAD_ROOMS_ERROR,
    LOAD_ROOMS_START,
    LOAD_ROOMS_SUCCESS,
    NEW_MESSAGES_FOR_ROOM,
    NEW_USERS_FOR_ROOM,
    SET_ACTIVE_ROOM,
    SET_FILTERED_ROOMS
} from "../../action-types";
import {Message, Room, User} from "../types";

export const setActiveRoom = (activeRoom: string | null) => ({
    type: SET_ACTIVE_ROOM,
    activeRoom
})

export const setFilteredRooms = (filteredRooms: Room[]) => ({
    type: SET_FILTERED_ROOMS,
    filteredRooms
})

export const loadRoomsStart = () => ({
    type: LOAD_ROOMS_START,
})

export const loadRoomsSuccess = (rooms: Room[]) => ({
    type: LOAD_ROOMS_SUCCESS,
    rooms
})

export const loadRoomsError = () => ({
    type: LOAD_ROOMS_ERROR,
})

export const deleteRoomStart = (id: string) => ({
    type: DELETE_ROOM_START,
    id
})

export const deleteRoomSuccess = () => ({
    type: DELETE_ROOM_SUCCESS
})

export const deleteRoomError = () => ({
    type: DELETE_ROOM_ERROR,
})

export const createRoomStart = (data: { userId: string, title: string }) => ({
    type: CREATE_ROOM_START,
    data
})

export const createRoomSuccess = () => ({
    type: CREATE_ROOM_SUCCESS,
})

export const createRoomError = () => ({
    type: CREATE_ROOM_ERROR
})

export const newUsersForRoom = (roomUsers: { users: User[], roomId: string }) => ({
    type: NEW_USERS_FOR_ROOM,
    roomUsers
})

export const newMessagesForRoom = (roomMessages: { messages: Message[], roomId: string }) => ({
    type: NEW_MESSAGES_FOR_ROOM,
    roomMessages
})