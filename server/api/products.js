const router = require('express').Router()
const { Spaceship, LineItems } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
	Spaceship.findAll()
		.then(spaceships => res.json(spaceships))
		.catch(next)
})

router.get('/category/:vesselType', (req, res, next) => {
	Spaceship.findAll({
		where: { vesselType: req.params.vesselType }
	})
		.then(spaceships => res.json(spaceships))
		.catch(next)
})

router.get('/:productId', (req, res, next) => {
	Spaceship.findById(req.params.productId)
		.then(spaceship => res.json(spaceship))
		.catch(next)
})

// router.put('/:productId', (req, res, next) => {
// 	console.log('ARE YOU IN HERE???')
// 	Spaceship.findOne({
// 		where: {
// 			id: req.params.productId
// 		}
// 	})
// 		.then(spaceshipToUpdate => spaceshipToUpdate.update(req.body))
// 		.then(spaceshipUpdated => res.json(spaceshipUpdated))
// 		.catch(next)
// })

router.put('/:productId', (req, res, next) => {
	const productId = req.params.productId;
	// console.log('GGGGGGGGGG', req.body)

	Spaceship.findById(productId)
		.then(spaceshipToUpdate => spaceshipToUpdate.update(req.body))
		.then(spaceshipUpdated => {
			console.log('spaceshipUpdated', spaceshipUpdated)
			res.json(spaceshipUpdated)
		})
		.catch(next)
})

router.post('/new-product', (req, res, next) => {
	Spaceship.create(req.body)
		.then(spaceship => res.json(spaceship))
		.catch(next)
})

