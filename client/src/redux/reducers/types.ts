import {ILoginData} from "../../api/types";
import {IMessage, IRoom, IUserData} from "../actions/types";

export interface ActionUi {
    type: string,
    step: string,
}

export interface ActionUser {
    type: string,
    loginData: ILoginData,
}

export interface ActionRoom {
    type: any;
    rooms: IRoom[];
    room: IRoom;
    roomUsers: { roomId: string; users: IUserData[]; };
    roomMessages: { roomId: string; messages: IMessage[]; };
    activeRoom: string;
    filteredRooms: IRoom[];
}