const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const router = Router()
const User = require('../models/User')

router.post(
    '/login',
    [
        check('username', 'Минимальная длина имени 4 символов')
            .isLength({min: 4})
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(411).json({
                message: 'Минимальная длина имени 4 символов'
            })
        }

        const {username} = req.body

        try {
            const candidate = await User.findOne({username})

            if (candidate) {
                return res.status(423).json({message: 'Такой пользователь уже существует'})
            }

            const user = new User({
                username,
            })

            await user.save()

            res.status(201).json({
                message: `Вы вошли - ${username}`,
                userId: user._id,
                username
            })
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