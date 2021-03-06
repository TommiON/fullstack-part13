const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist })
Blog.belongsToMany(User, { through: Readinglist })
User.hasMany(Readinglist)
Readinglist.belongsTo(User)
Blog.hasMany(Readinglist)
Readinglist.belongsTo(Blog)

User.hasMany(Session)
Session.belongsTo(User)

//Blog.sync( {alter: true} )
//User.sync( {alter: true} )

module.exports = {
    Blog, User, Readinglist, Session
}