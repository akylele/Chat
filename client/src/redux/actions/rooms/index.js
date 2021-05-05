import {
    CREATE_CHAT_START,
    CREATE_CHAT_SUCCESS,
    CREATE_CHAT_ERROR,
    LOAD_CHATS_START,
    LOAD_CHATS_SUCCESS,
    LOAD_CHATS_ERROR,
    SET_ACTIVE_CHAT,
    SET_FILTERED_CHATS
} from "../../action-types";

export const setActiveChat = activeChat => ({
    type: SET_ACTIVE_CHAT,
    payload: activeChat
})

export const setFilteredChats = filteredChats => ({
    type: SET_FILTERED_CHATS,
    payload: filteredChats
})

export const loadChatsStart = () => ({
    type: LOAD_CHATS_START,
})

export const loadChatsSuccess = (payload) => ({
    type: LOAD_CHATS_SUCCESS,
    payload
})

export const loadChatsError = (error) => ({
    type: LOAD_CHATS_ERROR,
    error
})

export const createChatStart = (title) => ({
    type: CREATE_CHAT_START,
    title
})

export const createChatSuccess = () => ({
    type: CREATE_CHAT_SUCCESS,
})

export const createChatError = (error) => ({
    type: CREATE_CHAT_ERROR,
    error
})