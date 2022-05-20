require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
var jsonParser = bodyParser.json()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            reruire: true,
            rejectUnauthorized: false
        }
    },
});

class Blog extends Model {}
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog' 
})

app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.findAll()
        return res.json(blogs)
    } catch(error) {
        return res.status(400).json({ error })
    }
})

app.post('/api/blogs', jsonParser, async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch(error) {
        return res.status(400).json({ error })
    }
})

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        await Blog.destroy({where: {id: req.params.id }})
        return res.status(200).send('tuhottu')
    } catch (error) {
        return res.status(400).json({ error })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server running at port ', PORT)
})