import {ILoginData} from "../api/types";
import {IUserStore} from "../redux/actions/types";

export interface IAllRooms {
    logout: (arg0: string) => void;
    user: IUserStore
    history: any;
}

export interface ILoginComponent {
    history: any,
    loginStart: (arg0: ILoginData) => void
}