const router = require('express').Router()
const { Order } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Order.findAll({})
        .then(carts => res.json(carts))
        .catch(next)
})

//after user logged in -> grab the cart associated with this id
router.get('/:userId/cart', (req, res, next) => {
    List.findById({
        where: {
            userId: req.body.params.userId
        }
    })
        .then(cart => res.json(cart))
        .catch(next)
}) 
