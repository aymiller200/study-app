require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./models/index')

const userController = require('./controllers/userController')
const notesController = require('./controllers/notesController')
const categoriesController = require('./controllers/categoriesController')

require('./models/associations')

app.use(require('./middleware/headers'))
app.use(express.json())

app.use('/user', userController)
app.use('/notes', notesController)
app.use('/categories', categoriesController)

db.sequelize.sync()

app.listen(3232, () => {
  console.log('App is listening on port 3232')
})
