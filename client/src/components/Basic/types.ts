import React, {KeyboardEvent, ReactChild, ReactFragment, ReactPortal} from "react";

export interface Input {
    icon?: string,
    handleChange?: 'IntrinsicAttributes & Input',
    handleClick?: React.MouseEventHandler<HTMLButtonElement>,
    value?: string,
    onKeyPress?: KeyboardEvent<HTMLInputElement>
}

export interface ICircleButton {
    icon: string,
    handleClick: React.MouseEventHandler<HTMLDivElement>,
}

export interface ICol {
    children?: ReactChild | ReactFragment | ReactPortal | boolean | null | undefined,
}

export interface IRow {
    position?: string,
    children?: ReactChild | ReactFragment | ReactPortal | boolean | null | undefined,
}