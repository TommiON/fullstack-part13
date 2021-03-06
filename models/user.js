const { sequelize } = require('../utils/db')
const { Model, DataTypes } = require('sequelize')

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { isEmail: true }
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
    }, {
        sequelize,
        underscored: true,
        modelName: 'user' 
})

module.exports = User