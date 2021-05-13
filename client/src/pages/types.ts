import { History } from 'history'

import {ILoginData} from "../api/types";
import {IUserStore} from "../redux/actions/types";

export interface IAllRooms {
    logout: (arg0: string) => void;
    user: IUserStore
    history: History;
}

export interface ILoginComponent {
    history: History,
    loginStart: (arg0: ILoginData) => void
}