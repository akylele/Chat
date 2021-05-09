import { api } from '../'

export const updateInfo = query => {
    return api
        .patch(`/user/${query.userId}`, query.socketId)
}
