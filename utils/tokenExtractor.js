const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const tokenExtractor = (req, res, next) => {
    const authorizationHeader = req.get('authorization')
    if(authorizationHeader && authorizationHeader.toLowerCase().startsWith('bearer ')) {
        try {
            console.log('*** tokeni:', authorizationHeader.substring(7))
            req.decodedToken = jwt.verify(authorizationHeader.substring(7), SECRET)
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