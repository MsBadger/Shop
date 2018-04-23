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

// NEW GET CART
router.get('/:userId/cart', (req, res, next) => {
  if (req.params.userId === "guest") {
    Order.findOrCreate({
      where: {
        sessionId: req.session.id,
        status: 'open'
      }
      ,
      include: [{ model: Spaceship }]
    })
      .then(cart => {
        res.json(cart)
      })
  }
  else {
    Order.findOrCreate({
      where: {
        userId: Number(req.params.userId),
        status: 'open'
      }
      ,
      include: [{ model: Spaceship }]
    })
      .then(products => {
        res.json(products)
      })
      .catch(next)
  }
})


// CREATE NEW CART
router.post('/:userId/cart', (req, res, next) => {
  LineItems.create(
    req.body)
    .then(newLine => {
      res.json(newLine)
    })
    .catch(next)
})
// DELETE CART
//This is the route to clear the WHOLE cart  
// We're saying req.body will have the order Id as a property
router.delete('/:userId/cart', (req, res, next) => {
  if (req.params.userId === 'guest') {
    Order.destroy({
      where: {
        sessionId: req.session.id,
        status: 'open'
      }
    })
      .then(() => {
        res.status(200).send("Successfully deleted cart")
      })
      .catch(next)
  } 
  else {
    Order.destroy({
      where: {
        userId: Number(req.params.userId),
        status: 'open'
      }
    })
      .then(() => {
        res.status(20).send("Successfully deleted cart")
      })
      .catch(next)
    }
})

// DELETE ITEM
//The following route will be used to delete just one line item
router.delete('/:userId/cart/:orderId/:spaceshipId', (req, res, next) => {
  LineItems.destroy({
    where: {
      spaceshipId: Number(req.params.spaceshipId),
      orderId: Number(req.params.orderId)
    }
  })
    .then(() => {
      res.status(204).send("Successfully deleted item")
    })
    .catch(next)
}
)


//Route to add a new item to the cart 
router.post('/:userId/cart/:orderId/:spaceshipId', (req, res, next) => {
  LineItems.create(
    {
      quantity: req.body.quantity,
      spaceshipId: req.params.spaceshipId,
      orderId: req.params.orderId
    })
    .then(newLine => {
      res.json(newLine)
    })
    .catch(next)
})


