const router = require('express').Router()
const { Blog, User } = require('../models')
const tokenExtractor = require('../utils/tokenExtractor')
const { jsonParser } = require('../utils/jsonParser')

router.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.findAll()
        return res.json(blogs)
    } catch(error) {
        return res.status(400).json({ error })
    }
})

router.post('/', tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({...req.body, userId: user.id})
        return res.json(blog)
    } catch(error) {
        return res.status(400).json({ error })
    }
})

router.delete('/:id', tokenExtractor, async (req, res, next) => {
    try {
        const toBeDestroyed = await Blog.findByPk(req.params.id)
        
        if (toBeDestroyed.userId === req.decodedToken.id) {
            await Blog.destroy({where: {id: req.params.id }})
            return res.status(200).send('tuhottu')
        } else {
            res.status(401).send({error: 'vain blogin omistaja saa tuhota'})
        }       
    } catch (error) {
        console.log('virhe')
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
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

module.exports = router

