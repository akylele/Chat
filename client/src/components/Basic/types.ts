import React, {ChangeEvent, KeyboardEvent, ReactChild, ReactFragment, ReactPortal} from "react";
import {IUserStore} from "../../redux/actions/types";

export interface IInputComponent {
    icon?: string,
    handleChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    handleClick?: React.MouseEventHandler<HTMLButtonElement> | any,
    value?: string,
    onKeyPress?: KeyboardEvent<HTMLInputElement>
}

export interface ICircleButtonComponent {
    icon: string,
    handleClick: React.MouseEventHandler<HTMLDivElement>,
}

export interface IColComponent {
    children?: ReactChild | ReactFragment | ReactPortal | boolean | null | undefined,
}

export interface IRowComponent {
    position?: string,
    children?: ReactChild | ReactFragment | ReactPortal | boolean | null | undefined,
}

export interface IInputValue {
    borderFull: boolean,
    onChange: any,
    value?: string,
    ref: any
}

export interface IHeaderComponent {
    user: IUserStore
    handleLogout: () => void;
}