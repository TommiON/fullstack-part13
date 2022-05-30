const router = require('express').Router()
const { Op, BelongsToMany } = require("sequelize")
const { Blog } = require('../models')

router.get('/', async (req, res, next) => {
    try {
        const authors = await Blog.findAll({
            attributes: [
                'author',
                [Sequelize.fn('COUNT', Sequelize.col('likes')), 'n_likes'],
                [Sequelize.fn('COUNT', Sequelize.col('author')), 'n_blogs'],
              ],
            group: 'author'
        })
        res.status(200).json(authors)
    } catch (error) {
        res.status(400).send(error)
    }    
})

module.exports = router