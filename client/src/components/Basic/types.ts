import React, {ChangeEvent, KeyboardEvent, ReactChild, ReactFragment, ReactPortal} from "react";
import {IUserStore} from "../../redux/actions/types";

export interface IInputComponent {
    icon?: string,
    iconAttachFile?: string,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleClick?: () => void,
    handleAttachFile?: (e:ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void | undefined
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
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    ref: any
}

export interface IHeaderComponent {
    user: IUserStore
    handleLogout: () => void;
}