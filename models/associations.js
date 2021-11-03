const {User, Notes, Categories} = require('.')

Notes.belongsTo(Categories, {onDelete: 'CASCADE'})
Notes.belongsTo(User)
Categories.belongsTo(User)
Categories.hasMany(Notes, {as:'notes'})
User.hasMany(Categories, {as: 'categories'})
User.hasMany(Notes, {as: 'notes'})

