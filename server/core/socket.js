import socket from 'socket.io'

import Room from "../models/Room";

export default (http) => {
    const io = socket(http, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        }
    });

    io.on('connection', function (socket) {
        socket.emit('CONNECTED', {socketId: socket.id})

        socket.on('ROOM:JOIN', async ({roomId, user: userData}) => {
            socket.join(roomId);
            const candidate = await Room.findOne({_id: roomId})
            if (candidate) {
                const newUsers = candidate.users.concat({...userData, name: userData.username, status: 'online'})

                await Room.updateOne({_id: roomId}, {
                    $set:
                        {
                            users: newUsers
                        }
                })
                socket.to(roomId).emit('ROOM:UPDATE_USERS', {users: newUsers, roomId});
            }
        });

        socket.on('ROOM:DELETE', async ({roomId}) => {
            socket.to(roomId).emit('ROOM:DELETE_ROOM', {message: 'эта комната была удалена'});
        });

        socket.on('ROOM:EXIT', async ({userName, roomId}) => {
            const candidate = await Room.findOne({_id: roomId})
            if (candidate) {
                const newUsers = candidate.users.filter(user => user.name !== userName)
                await Room.findOneAndUpdate({_id: roomId}, {
                    $set:
                        {
                            users: newUsers
                        }
                })
                socket.to(roomId).emit('ROOM:UPDATE_USERS', {users: newUsers, roomId});
                socket.leave(roomId);
            }
        });

        socket.on('disconnect', async (userId) => {
            const candidate = await Room.find({'users._id': userId})
            if (candidate.length > 0) {
                const newUsers = candidate[0].users.filter(user => user.socketId !== socket.id)
                await Room.updateOne({_id: candidate[0]._id}, {
                    $set:
                        {
                            users: newUsers
                        }
                })
                const roomId = candidate[0]._id
                io.in(roomId).emit('ROOM:UPDATE_USERS', {users: newUsers, roomId});
                socket.to(roomId).emit('ROOM:UPDATE_USERS', {users: newUsers, roomId});
            }
        });
    });

    return io;
};