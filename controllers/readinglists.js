const router = require('express').Router()
const { Readinglist, User } = require('../models')
const tokenExtractor = require('../utils/tokenExtractor')

router.post('/', tokenExtractor, async (req, res, next) => {
    try {
        const thingToRead = await Readinglist.create(req.body)
        res.json(thingToRead)
    } catch(error) {
        next(error)
    }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
    try {
        const target = await Readinglist.update(
            {read: req.body.read},
            {where: {id: req.params.id, user_id: req.decodedToken.id }}
        )

        if((target[0]) === 0) {
            res.send('Blogia ei löydy tai ei ole sinun blogisi')
        }

        res.status(200).send('luettu!')
    } catch(error) {
        next(error)
    }
})

module.exports = router