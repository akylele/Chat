export type ILogoutData = {
    userId: string,
}

export type ILoginData = {
    username: string,
    password: string,
    socketId: string
}

export type UserLoginData = {
    username: string,
    userId: string,
    socketId: string
}

export type CreateRoomData = {
    title: string
    userId: string
}


