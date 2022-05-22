const errorHandler = (error, request, response, next) => {
    if (error.name === 'SequelizeValidationError') {
        response.status(400).send({ error: 'Käyttäjätunnuksen pitää olla validi sähköpostisoite' })
    }
    
    next(error)
}

module.exports = errorHandler