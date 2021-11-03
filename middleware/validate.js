const jwt = require('jsonwebtoken')
const { User } = require('../models')

const validate = (req, res, next) => {
  const token = req.headers.authorization

  if(!token){
    return res.status(403).json({
      auth: false, 
      message: 'No token provided'
    })
  }else{
    jwt.verify(token, 'I-AM-SECRET', (err, decoded) => {
      if(!err && decoded){
        User.findOne({
          where: {
            id: decoded.id
          }
        })
        .then(user => {
          if(!user) throw err
          req.user = user 
          return next()
        })
        .catch(err => next(err))
      }else{
        req.errors = err;
        return res.status(500).send('You are not authorized')
      }
    })
  }
}

module.exports = validate