import {Room, UserStore} from "../../redux/actions/types";

export interface IHeader {
    handleNewRoom: (arg0: string) => void
    handleReload: () => void
}

export interface AllRoomsContainerStore {
    rooms: {
        rooms: Room[]
        filteredRooms: Room[]
        activeRoom: string | null
    }
    user: UserStore
}

export interface AllRoomsContainerDispatch {
    type: string
    filteredRooms?: Room[]
    activeRoom?: string | null
    data?: {
        userId: string
        title: string
    }
    id?: string
}

export interface AllRoomsContainerProps {
    createRoom: (arg0: {
        userId: string
        title: string
    }) => void
    user: {
        userId: string
        username: string
    }
    setFilteredRooms: (arg0: Room[] | null) => void
    rooms: Room[]
    activeRoom: string
    setActiveRoom: (arg0: string) => void
    history: string[]
    deleteRoom: (arg0: string) => void
    loadRooms: () => void
    filteredRooms: Room[]
}