import {Room} from "../../redux/actions/types";

export interface IHeaderChat {
    currentRoom: Room
    handleBack: () => void
}

export interface IChatDispatch {
    type: string
    activeRoom: string | null
}

export interface IChatStore {
    rooms: {
        rooms: Room[]
        activeRoom: string
    }
    user: {
        username: string
    }
}

export interface IChatProps {
    activeRoom: string | null
    rooms: Room[]
    setActiveRoom: (arg0: null | string) => void
    username: string
    history: any
}