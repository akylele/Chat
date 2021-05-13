import {IRoom, IUserStore} from "../../redux/actions/types";

export interface IHeader {
    handleNewRoom: (arg0: string) => void
    handleReload: () => void
}

export interface AllRoomsContainerComponentStore {
    rooms: {
        rooms: IRoom[]
        filteredRooms: IRoom[]
        activeRoom: string | null
    }
    user: IUserStore
}

export interface AllRoomsContainerComponentDispatch {
    type: string
    filteredRooms: IRoom[] | null | []
    activeRoom: string | null
    data?: {
        userId: string
        title: string
    }
    id?: string
    loadRooms: (arg0: { type: string }) => void
    createRoom: (arg0: { type: string }) => void
    deleteRoom: (arg0: { id: string }) => void
}

export interface AllRoomsContainerComponent {
    createRoom: (arg0: {
        userId: string
        title: string
    }) => void
    user: {
        userId: string
        username: string
    }
    setFilteredRooms: (arg0: IRoom[] | null | []) => void
    rooms: IRoom[]
    activeRoom: string
    setActiveRoom: (arg0: string | null) => void
    history: any
    deleteRoom: (arg0: string) => void
    loadRooms: () => void
    filteredRooms: IRoom[]
}

export interface IItemComponent {
    active: boolean,
    handleChangeActive: (arg0: string) => void,
    room: IRoom,
    handleRemove: (arg0: string) => void,
    userId: string
}