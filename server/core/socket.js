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
        socket.on('ROOM:JOIN', async ({roomId, userName}) => {
            socket.join(roomId);
            const candidate = await Room.findOne({_id: roomId})
            const newUsers = candidate.users.concat({name: userName, status: 'online'})
            if (candidate) {
                try {
                    await Room.findOneAndUpdate({_id: roomId}, {
                        $set:
                            {
                                users: newUsers
                            }
                    })
                    socket.emit('SUCCESS-ROOM:JOIN', {message: 'Вы вошли в комнату'})
                } catch (e) {
                    socket.emit('ERROR-ROOM:JOIN', {message: 'Ошибка сервера'})
                }
            } else {
                socket.emit('ERROR-ROOM:JOIN', {message: 'Такой пользователь уже есть'})
            }

            socket.to(roomId).emit('ROOM:UPDATE_USERS', {users: newUsers, roomId});
        });

        socket.on('ROOM:DELETE', async ({roomId}) => {
            socket.to(roomId).emit('ROOM:DELETE_ROOM', {message: 'эта комната была удалена'});
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

        socket.on('ROOM:DELETE_TODO', async ({roomId, todo}) => {

            const candidate = await Room.findOne({
                roomId
            });
            if (candidate) {
                const deletedSocketTodos = []
                candidate.todos.forEach(item => {
                    if (todo._id == item._id) {
                        return;
                    }
                    deletedSocketTodos.push(item)
                })
                const updated = {todos: deletedSocketTodos}
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
            console.log('==========>socket.id', socket.id)
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