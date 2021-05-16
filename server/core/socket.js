import socket from 'socket.io'

import Room from "../models/Room";
import User from "../models/User";
import {BASE_URL_CLIENT} from "../../client/src/constants/api.ts";

export default (http) => {
    const io = socket(http, {
        cors: {
            origin: BASE_URL_CLIENT,
            credentials: true,
            extraHeaders: {
                "my-custom-header": "abcd"
            }
        }
    });

    io.on('connection', function (socket) {
        socket.emit('CONNECTED', {socketId: socket.id})

        socket.on('ROOM:JOIN', async ({roomId, user: userData}) => {
            socket.join(roomId);
            const candidate = await Room.findOne({_id: roomId})

            if (candidate) {
                try {
                    const newUsers = candidate.users.concat({
                        ...userData,
                        name: userData.username,
                        status: 'online',
                        _id: userData.userId
                    })

                    const newMessages = candidate.messages.concat({
                        from: 'service',
                        text: `${userData.username} вошел`,
                        date: new Date(Date.now()).toISOString()
                    })
                    await Room.updateOne({_id: roomId}, {
                        $set:
                            {
                                messages: newMessages,
                                users: newUsers
                            }
                    })
                    io.sockets.to(roomId).emit('ROOM:UPDATE_MESSAGES', {messages: newMessages, roomId});
                    io.sockets.to(roomId).emit('ROOM:UPDATE_USERS', {users: newUsers, roomId});

                    const creator = candidate.creator === userData.userId

                    if (creator) {
                        socket.to(roomId).emit('ROOM:JOIN_CREATOR', `В эту комнату подключился ее создатель - ${userData.username}`);
                    }
                } catch (e) {
                }
            }
        });

        socket.on('ROOM:DELETE', async ({roomId}) => {
            socket.to(roomId).emit('ROOM:DELETE_ROOM', {message: 'эта комната была удалена'});
        });

        socket.on('ROOM:EXIT', async ({userName, roomId}) => {
            const candidate = await Room.findOne({_id: roomId})
            if (candidate) {
                try {
                    const newMessages = candidate.messages.concat({
                        from: 'service',
                        text: `${userName} вышел`,
                        date: new Date(Date.now()).toISOString()
                    })
                    const newUsers = candidate.users.filter(user => user.name !== userName)
                    await Room.findOneAndUpdate({_id: roomId}, {
                        $set:
                            {
                                messages: newMessages,
                                users: newUsers
                            }
                    })
                    socket.to(roomId).emit('ROOM:UPDATE_MESSAGES', {messages: newMessages, roomId});
                    socket.to(roomId).emit('ROOM:UPDATE_USERS', {users: newUsers, roomId});
                    socket.leave(roomId);
                } catch (e) {
                }
            }
        });

        socket.on('ROOM:NEW_MESSAGE', async ({message, username, roomId}) => {
            const candidate = await Room.findOne({_id: roomId})
            if (candidate) {
                const dateNow = Date.now()
                const newMessages = candidate.messages.concat({
                    from: username,
                    text: message,
                    date: dateNow
                })
                try {
                    await Room.updateOne({_id: roomId}, {
                        $set:
                            {
                                dateOfLastMessage: dateNow,
                                lastMessage: message,
                                messages: newMessages
                            }
                    })
                    io.sockets.to(roomId).emit('ROOM:UPDATE_MESSAGES', {messages: newMessages, roomId});
                    io.sockets.emit('ROOM:UPDATE_ROOMS');
                } catch (e) {

                }
            }
        })

        socket.on('disconnect', async () => {
            const candidateRoom = await Room.findOne({'users.socketId': socket.id})
            const candidateUser = await User.findOne({'socketId': socket.id})
            if (candidateRoom && candidateUser) {
                try {
                    const roomId = candidateRoom._id
                    const newUsers = candidateRoom.users.filter(user => user.socketId !== socket.id)
                    const newMessages = candidateRoom.messages.concat({
                        from: 'service',
                        text: `${candidateUser.username} вышел`,
                        date: new Date(Date.now()).toISOString()
                    })
                    await Room.updateOne({_id: roomId}, {
                        $set:
                            {
                                messages: newMessages,
                                users: newUsers
                            }
                    })
                    io.emit('ROOM:UPDATE_USERS', {users: newUsers, roomId});
                } catch (e) {
                }
            }
        });
    });

    return io;
};