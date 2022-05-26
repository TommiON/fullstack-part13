const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { User } = require('../models')
const { SECRET } = require('../utils/config')

router.post('/', async (req, res) => {
    const user = await User.findOne({
        where: { username: req.body.username}
    })

    const passwordCorrect = req.body.password === 'sekred'

    if(!(user && passwordCorrect)) {
        return res.status(400).json({
            error: 'ongelmia käyttäjätunnuksessa tai salasanassa'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, SECRET)

    res.status(200).send({token, username: user.username, name: user.name})
})

module.exports = router
