const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('blogs', 'year', {
            type: DataTypes.INTEGER,
            min: 1991,
            max: new Date().getFullYear()
          })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('users')
        await queryInterface.dropTable('blogs')
    }
}