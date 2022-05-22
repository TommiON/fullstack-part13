const express = require('express')
const { PORT } = require('./utils/config')
const { connectToDataBase } = require('./utils/db')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const errorHandler = require('./utils/errorHandler')

const app = express()
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)

app.use(errorHandler)

const start = async () => {
    await connectToDataBase()
    app.listen(PORT, () => {
        console.log(`Sovellus käynnissä portissa ${PORT}`)
    })
}

start()