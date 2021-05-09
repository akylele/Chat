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

        socket.on('ROOM:JOIN', async ({roomId, userName}) => {
            socket.join(roomId);
            const candidate = await Room.findOne({_id: roomId})

            if (candidate) {
                const thisUser = candidate.users.filter(user => user.name === userName)
                if (thisUser.length === 0) {
                    const newUsers = candidate.users.concat({name: userName, status: 'online'})

                    await Room.updateOne({_id: roomId}, {
                        $set:
                            {
                                users: newUsers
                            }
                    })
                    socket.to(roomId).emit('ROOM:UPDATE_USERS', {users: newUsers, roomId});
                }
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

        socket.on('ROOM:UPDATE_TODO', async ({roomId, todo}) => {

            const candidate = await Room.findOne({
                roomId
            });

            if (candidate) {
                const updatedSocketTodos = candidate.todos.map(item => todo._id == item._id ? todo : item)
                const updated = {todos: updatedSocketTodos}
                try {
                    await Room.findOneAndUpdate(
                        {
                            roomId
                        },
                        {
                            $set: updated
                        },
                        {new: true},
                        (err, doc) => {
                            if (err || !doc) {
                                console.log('----->e', err)
                            } else {
                                io.in(roomId).emit('ROOM:ALL_TODOS', doc.todos);
                            }
                        });
                } catch (e) {
                    console.log('----->e', e)
                }
            }
        });

        socket.on('disconnect', async () => {
            let users = [];
            const candidate = await Room.findOne({'users.id': socket.id})

            if (candidate) {

                const sortSocketUser = candidate.users.filter(item => item.id !== socket.id)
                let updated = {users: sortSocketUser}

                try {
                    await Room.findOneAndUpdate(
                        {'users.id': socket.id},
                        {
                            $set: updated
                        },
                        {new: true},
                        (err, doc) => {
                            if (err || !doc) {
                                console.log('----->e', err)
                            } else {
                                users = doc.users.map(item => item.userName)

                            }
                        });
                } catch (e) {
                    console.log('----->e', e)
                }
                io.in(candidate.roomId).emit('ROOM:SET_USERS', users, candidate.todos);
            }

        });
        console.log('user connected', socket.id);
    });

    return io;
};