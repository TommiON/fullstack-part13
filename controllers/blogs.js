const router = require('express').Router()
const { Blog } = require('../models')
const { jsonParser } = require('../utils/jsonParser')
const errorHandler = require('./errorHandler')

router.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.findAll()
        return res.json(blogs)
    } catch(error) {
        return res.status(400).json({ error })
    }
})

router.post('/', jsonParser, async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch(error) {
        return res.status(400).json({ error })
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await Blog.destroy({where: {id: req.params.id }})
        return res.status(200).send('tuhottu')
    } catch (error) {
        console.log('virhe?')
        next(error)
    }
})

router.put('/:id', jsonParser, async (req, res, next) => {
    try {
        const targetId = req.params.id
        const newLikes = req.body.likes
        await Blog.update(
            { likes: newLikes },
            { where: { id: targetId } }
        )
        const updatedBlog = await Blog.findByPk(targetId)
        return res.status(200).json(updatedBlog)
    } catch (error) {
        console.log('virhe?')
        next(error)
        //return res.status(400).json({ error })
    }
})

router.use(errorHandler)

module.exports = router

