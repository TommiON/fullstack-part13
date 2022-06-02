const router = require('express').Router()
const { Readinglist } = require('../models')
const tokenExtractor = require('../utils/tokenExtractor')

router.post('/', tokenExtractor, async (req, res, next) => {
    try {
        const thingToRead = await Readinglist.create(req.body)
        res.json(thingToRead)
    } catch(error) {
        next(error)
    }
})

module.exports = router