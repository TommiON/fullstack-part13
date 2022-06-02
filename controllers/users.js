const router = require('express').Router()
const { Op } = require("sequelize");
const { User, Blog, Readinglist } = require('../models')
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
        const allUsers = await User.findAll({
            include: {model: Blog}
        })
        res.json(allUsers)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res, next) => {
    let searchTerm = {
        [Op.in]: [true, false]
    }
    if(req.query.read) {
        searchTerm = req.query.read
    }

    console.log('parametri: ', req.query.read)
    console.log('hakutermi: ', searchTerm)
    
    try {
        const user = await User.findOne({
            where: { id: req.params.id },
            include: { 
                model: Blog,
                attributes: ['author', 'url', 'title'],
                include: {
                    model: Readinglist,
                    attributes: ['read', 'id'],
                    where: { read: searchTerm }
                },
                through: {
                    attributes: []
                  }
             }
        })
        res.status(200).json(user)
    } catch (error) {
        next(error)
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