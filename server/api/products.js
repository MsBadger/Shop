const router = require('express').Router()
const { Spaceship } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Spaceship.findAll()
    .then(spaceships => res.json(spaceships))
    .catch(next)
})

router.get('/category/:vesselType', (req, res, next) => {
	Spaceship.findAll({
		where: { vesselType : req.params.vesselType }
	})
	.then(spaceships => res.json(spaceships))
	.catch(next)
})

router.get('/:productId', (req, res, next) => {
	Spaceship.findById(req.params.productId)
	.then(spaceship => res.json(spaceship))
	.catch(next)
})

