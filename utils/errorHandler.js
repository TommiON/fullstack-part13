const errorHandler = (error, request, response, next) => {
    if (error.name === 'SequelizeValidationError' && (error.message.includes('Validation min on year failed') || error.message.includes('Validation max on year failed'))) {
        response.status(400).send( { error: 'Vuosi saa olla välillä 1991 - kuluva vuosi '})
    }
    if (error.name === 'SequelizeValidationError') {
        response.status(400).send({ error: 'Käyttäjätunnuksen pitää olla validi sähköpostisoite' })
    }
    
    next(error)
}

module.exports = errorHandler