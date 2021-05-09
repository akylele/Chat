const {Router} = require('express')
const router = Router()
const User = require('../models/User')

router.patch(
    '/:id',
    async (req, res) => {
        const {socketId} = req.body
        const {userId} = req.params

        try {
            await User.findOneAndUpdate({_id: userId}, {
                $set:
                    {
                        socketId
                    }
            })
        } catch (e) {
            return res.status(500).json({message: 'Ошибка обновления'})
        }
    })

module.exports = router