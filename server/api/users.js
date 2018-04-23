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

// GET CART
router.get('/:userId/cart', (req, res, next) => {
  // userId should be req.user || param IF isAdmin -- KHLG
  Order.findOrCreate({
    where: {
      userId: Number(req.params.userId),
      status: 'open'
    }
    ,
    // include: [{ model: Spaceship }]
  })
  .then(([order]) => LineItem.findAll({ where: {orderId: order.id}, include: [Spaceship]}))
  .then(products => res.json(products)) // KHLG
  // you should return lineItems
    // .then(([products]) => {
      // res.json(products)
    // })
    .catch(next)
})

// CREATE NEW CART
router.post('/:userId/cart', (req, res, next) => {
  // is it being associated with cart? LineItem should have userId and orderId, so get that from req.user (unless admin) and users open order (findOrCreate) THEN create on the lineItems table -- KHLG
  LineItems.create(
    req.body) 
    .then(newLine => {
      console.log("This is NEW LINE", newLine)
      res.json(newLine)
    })
    .catch(next)
})
// DELETE CART
//This is the route to clear the WHOLE cart  
// We're saying req.body will have the order Id as a property
router.delete('/:userId/cart', (req, res, next) => {
  Order.destroy({
    where: { 
    userId: Number(req.params.userId),
    status: 'open' 
  }
  }) // cascade true. Make sure lineItems associated with this order are destroyed. OR just go through and delete all LineItems associated with this open order -- KHLG
    .then(() => {
      res.status(204).send("Successfully deleted cart")
    })
    .catch(next)
}
)

// DELETE ITEM
//The following route will be used to delete just one line item
router.delete('/:userId/cart/:orderId/spaceship/:spaceshipId', (req, res, next) => {
  LineItems.destroy({
    where: { spaceshipId: Number(req.params.spaceshipId) ,
             orderId: Number(req.params.orderId)  }
    })
    .then( () => {
      res.status(204).send("Successfully deleted item") // 204 means no content, so express removes the body (your send message) -- KHLG
    })
    .catch(next)
}
)

