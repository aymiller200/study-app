const router = require('express').Router()
const validate = require('../middleware/validate')
const { Categories } =  require('../models')

router.post('/create', validate,(req, res) => {
  Categories.create(req.body)

  .then((category) => {
    res.status(200).send({ category })
  })
  .catch((err) => {
    res.status(500).send({err})
  })
})

router.delete('/delete/:UserId/:id', validate, (req, res) => {
  if (Number(req.params.UserId) === req.user.id) {
    Categories.destroy({ where: { id: req.params.id } })
      .then((destroyed) =>
        res.status(200).json({ message: 'Category deleted', destroyed }),
      )
      .catch((err) => res.status(500).json({ error: err }))
  } else {
    res.status(403).json({ message: 'Unable to delete.' })
  }
})

router.get('/all/:UserId', validate, (req, res) => {
  if (Number(req.params.UserId) === req.user.id) {
    Categories.findAll({
      where: { UserId: req.params.UserId },
      include: ['notes']
    })
      .then((notes) => res.status(200).json(notes))
      .catch((err) =>
        res.status(500).json({ message: 'Failed to get categories', error: err }),
      )
  } else {
    res.status(403).json({ message: 'This content is forbidden!' })
  }
})

router.put('/edit/:UserId/:id', validate, (req, res) => {
  if (Number(req.params.UserId) === req.user.id) {
    Categories.update(req.body, { where: { id: req.params.id } })
      .then((updated) =>
        res
          .status(200)
          .json({ message: `Note #${req.params.id} updated!`, updated }),
      )
      .catch((err) =>
        res.status(500).json({ message: 'Update unsuccessful', error: err }),
      )
  } else {
    res.status(403).json({ message: 'Unable to edit.' })
  }
})

module.exports = router