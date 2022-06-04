const jwt = require('jsonwebtoken')
const router = require('express').Router()
const tokenExtractor = require('../utils/tokenExtractor')
const { User, Session } = require('../models')

router.get('/', tokenExtractor, async (req, res, next) => {
    const id = req.decodedToken.id
    try{
        await Session.destroy({where: { userId: id }})
        res.status(200).send('logattu ulos, kaikki sessiot tuhottu')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
