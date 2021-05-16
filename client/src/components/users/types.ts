import {IUserData} from "../../redux/actions/types";

export interface IListComponent {
    users:  IUserData[],
    creator: string
}