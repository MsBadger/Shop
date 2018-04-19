const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

router.use('/products', require('./products'))
<<<<<<< HEAD
=======

// router.use('/carts', require('./carts'))
>>>>>>> 550ea195e29353c0ec1f10bfdbaa9a75915adda7

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})


