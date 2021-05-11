import {Login} from "../../api/types";
import {Message, Room, User} from "../actions/types";

export interface ActionUi {
    type: string,
    step: string,
}

export interface ActionUser {
    type: string,
    loginData: Login,
}

export interface ActionRoom {
    type: any;
    rooms: Room[];
    room: Room;
    roomUsers: { roomId: string; users: User[]; };
    roomMessages: { roomId: string; messages: Message[]; };
    activeRoom: string;
    filteredRooms: Room[];
}