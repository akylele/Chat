export interface Room {
    _id: string,
    messages: Message[],
    users: User[],
    title: string,
    creator: string,
    dateOfLastMessage: string,
    lastMessage: string
}

export interface User {
    name: string,
    status: string,
    socketId: string
    _id?: string
}

export interface UserStore {
    username: string
    userId: string
    socketId: string
    status?: string
    loading: boolean
    _id?: string
}

export interface Message {
    from: string,
    text: string,
    date: string
}
