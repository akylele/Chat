import {History} from 'history'

import {IRoom} from "../../redux/actions/types";

export interface IHeaderChatComponent {
    currentRoom: IRoom
    handleBack: () => void
}

export interface IChatDispatch {
    type: string
    activeRoom: string | null
}

export interface IChatStore {
    rooms: {
        rooms: IRoom[]
        activeRoom: string | null
    }
    user: {
        username: string
    }
}

export interface IChatComponent {
    activeRoom: string | null
    rooms: IRoom[]
    setActiveRoom: (arg0: null | string) => void
    username: string
    history?: History
}