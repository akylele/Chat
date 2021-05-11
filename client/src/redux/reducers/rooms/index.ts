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

import {Room} from '../../actions/types'
import {ActionRoom} from "../types";

const initialState = {
    activeRoom: null,
    filteredRooms: null,
    rooms: [],
    loading: false
}
export default function uiReducer(state = initialState, action: ActionRoom) {
    switch (action.type) {
        case DELETE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case DELETE_ROOM_ERROR:
            return {
                ...state,
                loading: false,
            }
        case DELETE_ROOM_START:
            return {
                ...state,
                loading: true
            }
        case LOAD_ROOMS_SUCCESS:
            return {
                ...state,
                rooms: action.rooms,
                loading: false
            }
        case LOAD_ROOMS_ERROR:
            return {
                ...state,
                loading: false,
            }
        case LOAD_ROOMS_START:
            return {
                ...state,
                loading: true
            }
        case NEW_USERS_FOR_ROOM:
            return {
                ...state,
                rooms: state.rooms.map((room: Room) => {
                    if (room._id === action.roomUsers.roomId) {
                        room.users = action.roomUsers.users
                    }

                    return room
                })
            }
        case NEW_MESSAGES_FOR_ROOM:
            return {
                ...state,
                rooms: state.rooms.map((room: Room) => {
                    if (room._id === action.roomMessages.roomId) {
                        room.messages = action.roomMessages.messages
                    }

                    return room
                })
            }
        case SET_ACTIVE_ROOM:
            return {
                ...state,
                activeRoom: action.activeRoom
            }
        case SET_FILTERED_ROOMS:
            return {
                ...state,
                filteredRooms: action.filteredRooms
            }
        case CREATE_ROOM_START:
            return {
                ...state,
                loading: true
            }
        case CREATE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case CREATE_ROOM_ERROR:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}