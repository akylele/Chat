const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const router = Router()
const User = require('../models/User')
const Room = require('../models/Room')

router.post(
    '/create',
    [
        check('title', 'Минимальная длина названия 4 символов')
            .isLength({min: 4})
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(411).json({
                message: 'Минимальная длина названия 4 символов'
            })
        }

        const {title} = req.body

        try {
            const candidate = await User.findOne({title})

            if (candidate) {
                return res.status(423).json({message: 'Такая комната уже существует'})
            }

            const room = new Room({
                title,
            })

            await room.save()

            res.status(201).json({
                message: `Вы создали команту - ${title}`,
            })

        } catch (e) {
            return res.status(500).json({message: 'Ошибка создания'})
        }
    })

router.get(
    '/getAll',
    async (req, res) => {
        try {
            const rooms = await Room.find({}).lean()

            return res.status(200).json(rooms)
        } catch (e) {
            return res.status(500).json({message: 'ошибка получения'})
        }
    })

module.exports = router