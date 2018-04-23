const router = require('express').Router()
const { Spaceship, Review } = require('../db/models')
module.exports = router


// `/api/products?catgeory=[vesselType]`
router.get('/', (req, res, next) => {
	const query = req.query.category ? {vesselType: req.query.category} : {} // combine this with route below -- KHLG
	Spaceship.findAll(query)
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

router.get('/reviews/:productId', (req, res, next) => { // restful routing `/products/:productId/reviews`
	console.log('got to my backend reviews route')
	Review.findAll({
        where: { spaceshipId: req.params.productId }
    })
    	.then(reviews => {
    		console.log('inside backend api, found these reviews:', reviews)
    		res.json(reviews)
    		})
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

function throwError (status, msg) {
	const err = new Error(msg)
	err.status = status
	throw err
}

function isLoggedIn (req, res, next) { // pull out to utility file and reuse everywhere -- KHLG
	if (!req.user) throwError(401, 'unauthorized')
	next()
}

router.put('/:productId', isLoggedIn, (req, res, next) => {
	if (!req.user.isAdmin) // throw 403
	next()
}, (req, res, next) => {
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

router.post('/new-product', (req, res, next) => { // post means create you don't need anything for the path `/` -- KHLG
	Spaceship.create(req.body)
		.then(spaceship => res.json(spaceship))
		.catch(next)
})
