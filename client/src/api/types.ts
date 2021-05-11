export type Logout = {
    userId: string,
}

export type Login = {
    username: string,
    password: string,
    socketId: string
}

export type UserLogin = {
    username: string,
    userId: string,
    socketId: string
}

export type CreateRoom = {
    title: string
    userId: string
}


