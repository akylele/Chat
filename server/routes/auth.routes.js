const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const router = Router()
const User = require('../models/User')

router.post(
    '/login',
    [
        check('username', 'Минимальная длина имени 4 символов')
            .isLength({min: 4}),
        check('password', 'Минимальная длина пароля 4 символов')
            .isLength({min: 4})
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(411).json({
                message: 'Минимальная длина имени и пароля 4 символов'
            })
        }

        const {username, password, socketId} = req.body

        try {
            const candidate = await User.findOne({username})
            if (candidate && candidate.password === password) {
                res.status(201).json({
                    message: `Вы вошли - ${username}`,
                    userId: candidate._id,
                    username,
                    socketId
                })
            } else if (candidate && candidate.password !== password) {
                return res.status(423).json({message: 'неверный пароль к этому юзеру'})
            } else {
                const user = new User({
                    username,
                    password,
                    socketId
                })

                await user.save()

                res.status(201).json({
                    message: `Вы вошли - ${username}`,
                    userId: user._id,
                    username,
                    socketId
                })
            }
        } catch (e) {
            return res.status(500).json({message: 'Ошибка авторизации'})
        }
    })

router.post(
    '/logout',
    async (req, res) => {
        const {userId} = req.body

        if (!userId) {
            return res.status(400).json({message: 'Не получен id опользователя'})
        }

        try {
            await User.deleteOne({_id: userId})

            return res.status(200).json({message: 'успешный выход'})
        } catch (e) {
            return res.status(500).json({message: 'Неуспешный выход'})
        }
    })

module.exports = router