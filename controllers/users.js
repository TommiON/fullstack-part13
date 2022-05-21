const router = require('express').Router()
const { User } = require('../models')
const { jsonParser } = require('../utils/jsonParser')
const errorHandler = require('./errorHandler')

router.post('/', jsonParser, async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        res.json(newUser)
    } catch (error) {
        console.log(error)
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

router.put('/:username', jsonParser, async (req, res, next) => {
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

module.exports = router