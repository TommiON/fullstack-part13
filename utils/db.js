const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')
console.log('DATABASE_URL: ', DATABASE_URL)

const sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
            reruire: true,
            rejectUnauthorized: false
        }
    },
});

const runMigrations = async () => {
    const migrator = new Umzug({
        migrations: {
          glob: 'migrations/*.js',
        },
        storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
        context: sequelize.getQueryInterface(),
        logger: console,
      })
    
    const migrations = await migrator.up()
    
    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name),
    })
}    


const connectToDataBase = async () => {
    try {
        await sequelize.authenticate()
        await runMigrations()
        console.log('muodostettu yhteys tietokantaan')
    } catch (error) {
        console.log('VIRHE: ei yhteyttä tietokantaan', error)
        return process.exit(1)
    }

    return null
}

module.exports = { connectToDataBase, sequelize }

