const router = require('express').Router()
const validate = require('../middleware/validate')
const { Notes } = require('../models')

router.post('/create', validate, (req, res) => {
  Notes.create(req.body)
    .then((notes) => {
      res.status(200).send({ notes })
    })
    .catch((err) => {
      res.status(500).send({ err })
    })
})

router.delete('/delete/:UserId/:id', validate, (req, res) => {
  if (Number(req.params.UserId) === req.user.id) {
    Notes.destroy({ where: { id: req.params.id } })
      .then((destroyed) =>
        res.status(200).json({ message: 'Notes deleted', destroyed }),
      )
      .catch((err) => res.status(500).json({ error: err }))
  } else {
    res.status(403).json({ message: 'You cannot delete what isn\t yours.' })
  }
})

router.get('/all/:UserId', validate, (req, res) => {
  if (Number(req.params.UserId) === req.user.id) {
    Notes.findAll({
      where: { UserId: req.params.UserId },
    })
      .then((notes) => res.status(200).json(notes))
      .catch((err) =>
        res.status(500).json({ message: 'Failed to get reviews', error: err }),
      )
  } else {
    res.status(403).json({ message: 'This content is forbidden!' })
  }
})

router.put('/edit/:UserId/:id', validate, (req, res) => {
  if (Number(req.params.UserId) === req.user.id) {
    Notes.update(req.body, { where: { id: req.params.id } })
      .then((updated) =>
        res
          .status(200)
          .json({ message: `Note #${req.params.id} updated!`, updated }),
      )
      .catch((err) =>
        res.status(500).json({ message: 'Update unsuccessful', error: err }),
      )
  } else {
    res.status(403).json({ message: 'You cannot edit what is not yours!' })
  }
})

module.exports = router
