const Sequelize = require('sequelize')

const sequelize = new Sequelize('todo-server', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('./user')(sequelize, Sequelize)
db.Notes = require('./notes')(sequelize, Sequelize)
db.Categories = require('./categories')(sequelize, Sequelize)

module.exports = db
