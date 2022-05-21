const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
console.log('DATABASE_URL: ', DATABASE_URL)

const sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
            reruire: true,
            rejectUnauthorized: false
        }
    },
});

const connectToDataBase = async () => {
    try {
        await sequelize.authenticate()
        console.log('muodostettu yhteys tietokantaan')
    } catch (error) {
        console.log('VIRHE: ei yhteyttä tietokantaan')
        return process.exit(1)
    }

    return null
}

module.exports = { connectToDataBase, sequelize }

