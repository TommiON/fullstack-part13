const router = require('express').Router()
const { Blog } = require('../models')
const { jsonParser } = require('../utils/jsonParser')

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll()
        return res.json(blogs)
    } catch(error) {
        return res.status(400).json({ error })
    }
})

router.post('/', jsonParser, async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch(error) {
        return res.status(400).json({ error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Blog.destroy({where: {id: req.params.id }})
        return res.status(200).send('tuhottu')
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.put('/:id', jsonParser, async (req, res) => {
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
        return res.status(400).json({ error })
    }
})

module.exports = router

