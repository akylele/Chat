import RoomsModel from '../models/Room';

class RoomController {
    constructor(io) {
        this.io = io;
    }

    index = async (req, res) => {

        const {id: roomId} = req.params;
        const candidate = await RoomsModel.findOne({
            roomId
        });

        if (candidate) {

            const users = candidate.users.map(item => item.userName)
            const obj = {
                users,
                todos: candidate.todos,
            }

            res.json(obj);
        } else {

            const obj = {
                roomId,
                users: [],
                todos: [],
            }

            res.json(obj);
        }
    };

    create = async (req, res) => {

        const {roomId, userName} = req.body;
        const candidate = await RoomsModel.findOne({
            roomId
        });

        if (candidate) {

            let updated = userName === 'admin'
                ? {
                    users: [...candidate.users, {userName}],
                    todos: []
                }
                : {users: [...candidate.users, {userName}]}

            try {
                await RoomsModel.findOneAndUpdate(
                    {
                        roomId,
                    },
                    {
                        $set: updated
                    },
                    {new: true},
                    (err, doc) => {
                        if (err || !doc) {
                            res.status(500).json({
                                massage: err
                            })
                        } else {
                            return res.status(201).json({
                                doc
                            })
                        }
                    });
            } catch (e) {
                res.status(500).json({
                    massage: e
                })
            }
        } else {

            let newRooms = new RoomsModel({
                roomId,
                users: [{
                    userName
                }],
                todos: [],
            });

            try {
                await newRooms.save();
                res.status(201).json({
                    newRooms
                })
            } catch (e) {
                res.status(500).json({
                    massage: e
                })
            }
        }
    };
}

export default RoomController;