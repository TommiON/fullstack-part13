const { sequelize } = require('../utils/db')
const { Model, DataTypes } = require('sequelize')

class Readinglist extends Model {}

Readinglist.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id'}
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id'}
    }},
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'readinglist'
    })

module.exports = Readinglist