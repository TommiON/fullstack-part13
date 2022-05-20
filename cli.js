require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')

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


const main = async () => {
    try{
        await sequelize.authenticate()
        const stuff = await Blog.findAll()
        stuff.map(b => {
            console.log(b.author, ': ', b.title, ', ', b.likes, ' likes')
        })
    } catch (error) {
        console.log('virhe!', error)
    }
}

main()