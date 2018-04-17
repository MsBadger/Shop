const router = require('express').Router()
const { Spaceship } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Spaceship.findAll()
    .then(spaceships => res.json(spaceships))
    .catch(next)
})