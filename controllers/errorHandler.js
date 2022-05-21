const errorHandler = (error, request, response, next) => {
    console.log('VIRHE! VIRHE! VIRHE! ', error)
    return response.status(400).json( { "perseelleen menon syy": error })
}

module.exports = errorHandler