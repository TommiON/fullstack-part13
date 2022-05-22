const router = require('express').Router()
const { User } = require('../models')
const errorHandler = require('../utils/errorHandler')

router.post('/', async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        res.json(newUser)
    } catch(error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const allUsers = await User.findAll()
        res.json(allUsers)
    } catch (error) {
        console.log(error)
    }
})

router.put('/:username', async (req, res, next) => {
    try {
        const targetUsername = req.params.username
        const newName = req.body.name
        await User.update(
            { name: newName },
            { where: {username: targetUsername} }
        )
        const user = await User.findOne({
            where: { username: targetUsername}
        })
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

//router.use(errorHandler)

module.exports = router