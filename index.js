const express = require('express')
const { PORT } = require('./utils/config')
const { connectToDataBase } = require('./utils/db')
const blogsRouter = require('./controllers/blogs')

const app = express()

app.use('/api/blogs', blogsRouter)

const start = async () => {
    await connectToDataBase()
    app.listen(PORT, () => {
        console.log(`Sovellus käynnissä portissa ${PORT}`)
    })
}

start()