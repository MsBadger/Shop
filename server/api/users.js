const router = require('express').Router()
const { User } = require('../db/models')
const { Order, LineItems, Spaceship } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'name', 'photo']
  })
    .then(users => res.json(users))
    .catch(next)
})

// router.get('/:userId')

//after user logged in -> grab the cart associated with this id
router.get('/:userId/cart', (req, res, next) => {
  Order.findOrCreate({
    where: {
      userId: Number(req.params.userId),
      status: 'open'
    }
    ,
    include: [{ model: Spaceship }]
  })
    .then(products => {
      console.log('products', products)
      res.json(products)
    })
    .catch(next)
})


router.post('/:userId/cart', (req, res, next) => {
  LineItems.create(
    req.body)
    .then(newLine => {
      console.log("This is NEW LINE", newLine)
      res.json(newLine)
    })
    .catch(next)
})

//This is the route to clear the WHOLE cart  
// We're saying req.body will have the order Id as a property
router.delete('/:userId/cart', (req, res, next) => {
  Order.destroy({
    where: { 
    userId: Number(req.params.userId),
    status: 'open' 
  }
  })
    .then(() => {
      res.status(204).send("Successfully deleted cart")
    })
    .catch(next)
}
)

//The following route will be used to delete just one line item

router.delete('/:userId/cart/:orderId/:spaceshipId', (req, res, next) => {
  LineItems.destroy({
    where: { spaceshipId: Number(req.params.spaceshipId) ,
             orderId: Number(req.params.orderId)  }
  })
    .then(singleItem => {
      res.status(204).send("Successfully deleted item")
    })
    .catch(next)
}
)

