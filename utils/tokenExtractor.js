const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { User, Session } = require('../models')

const tokenExtractor = async (req, res, next) => {
    const authorizationHeader = req.get('authorization')
    if(authorizationHeader && authorizationHeader.toLowerCase().startsWith('bearer ')) {
        try {
            const tokenFromHeader = authorizationHeader.substring(7)
            console.log('*** tokeni:', tokenFromHeader)
            const activeSession = await Session.findOne({where: { token: tokenFromHeader }})
            if(activeSession === null) {
                return res.status(401).send('Ei aktiivista sessiota, tokenia ei löydy').end()
            }
            req.decodedToken = jwt.verify(tokenFromHeader, SECRET)
        } catch (error) {
            console.log(error)
            return res.status(401).json({ error: 'token ei kelpaa'})
        }
    } else {
        return res.status(401).json({ error: 'tokenia ei löydy'})
    }

    next()

}

module.exports = tokenExtractor