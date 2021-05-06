import socket from 'socket.io'

import RoomsModel from "../models/Room";

export default (http) => {
    const io = socket(http, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });

    io.on('connection', function (socket) {
        socket.on('ROOM:JOIN', async ({roomId, userName}) => {
            socket.join(roomId);

            const candidate = await RoomsModel.findOne({
                roomId
            });
            let users = [];
            let todos = [];

            if (candidate) {

                const sortSocketUser = [...candidate.users, {id: socket.id, userName}].filter(item => !!item.id)
                let updated = {users: sortSocketUser}

                try {
                    await RoomsModel.findOneAndUpdate(
                        {
                            roomId
                        },
                        {
                            $set: updated
                        },
                        {new: true},
                        (err, doc) => {
                            if (err || !doc) {
                                socket.to(candidate.roomId).broadcast.emit('error', err);
                            } else {
                                users = doc.users.map(item => item.userName)
                                todos = doc.todos
                            }
                        });
                } catch (e) {
                    console.log('----->e', e)
                }
            }
            socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users, todos);
        });

        socket.on('ROOM:NEW_TODO', async ({roomId, userName, text, checked}) => {
            const obj = {
                userName,
                text,
                checked
            };
            const candidate = await RoomsModel.findOne({
                roomId
            });
            if (candidate) {

                const sortSocketTodos = [obj, ...candidate.todos.reverse()].slice(0, 20).reverse()
                let updated = {
                    todos: sortSocketTodos
                }
                try {
                    await RoomsModel.findOneAndUpdate(
                        {
                            roomId
                        },
                        {
                            $set: updated
                        },
                        {new: true},
                        (err, doc) => {
                            if (err || !doc) {
                                socket.to(candidate.roomId).broadcast.emit('error', err);
                            } else {
                                io.in(roomId).emit('ROOM:NEW_TODO', doc.todos);
                            }
                        });
                } catch (e) {
                    console.log('----->e', e)
                }
            }
        });

        socket.on('ROOM:UPDATE_TODO', async ({roomId, todo}) => {

            const candidate = await RoomsModel.findOne({
                roomId
            });

            if (candidate) {
                const updatedSocketTodos = candidate.todos.map(item => todo._id == item._id ? todo : item)
                const updated = {todos: updatedSocketTodos}
                try {
                    await RoomsModel.findOneAndUpdate(
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

            const candidate = await RoomsModel.findOne({
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
                    await RoomsModel.findOneAndUpdate(
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
            const candidate = await RoomsModel.findOne({'users.id': socket.id})

            if (candidate) {

                const sortSocketUser = candidate.users.filter(item => item.id !== socket.id)
                let updated = {users: sortSocketUser}

                try {
                    await RoomsModel.findOneAndUpdate(
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