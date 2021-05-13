export interface IRoom {
    _id: string,
    messages: IMessage[],
    users: IUserData[],
    title: string,
    creator: string,
    dateOfLastMessage: string,
    lastMessage: string
}

export interface IUserData {
    name: string,
    status: string,
    socketId: string
    _id?: string
}

export interface IUserStore {
    username: string
    userId: string
    socketId: string
    status?: string
    loading: boolean
    _id?: string
}

export interface IMessage {
    from: string,
    text: string,
    date: string
}
