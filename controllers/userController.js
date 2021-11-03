const router = require('express').Router()
const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 13),
  })
    .then((user) => {
      let token = jwt.sign({ id: user.id }, 'I-AM-SECRET', { expiresIn: '1d' })
      res.status(200).send({ user: user, token: token })
    })
    .catch((err) => res.status(500).send({ err }))
})

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function (err, match) {
          match ? generateToken(user) : res.send(`Something went wrong: ${err}`)
        })
        const generateToken = (user) => {
          let token = jwt.sign({ id: user.id }, 'I-AM-SECRET', {
            expiresIn: '1d',
          })
          res.send({ user: user, token: token })
        }
      } else {
        res.send('User Not Found')
      }
    })
    .catch((err) => res.status(500).json({ error: err }))
})

module.exports = router
