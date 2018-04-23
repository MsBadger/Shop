const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')
const LineItems = require('../db/models/lineItems')

module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        console.log('No such user found:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else if (!user.correctPassword(req.body.password)) {
        console.log('Incorrect password for user:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})


//NEW VERSION OF SIGNUP ROUTE - takes an array of items from quest cart
router.post('/signup', (req, res, next) => {
  console.log('SIGNUP req.body', req.body)
  User.create({email: req.body.email, password: req.body.password})
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
      return user;
    })
    .then( user => {
      Order.create({userId: user.id, status: 'open'})
        .then( order => {
          req.body.guestCart.map(spaceshipId => 
            LineItems.create({orderId: order.id, spaceshipId: spaceshipId, quantity: 1})
          )
        })
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

//PREVIOUS VERSION OF SIGNUP ROUTE
// router.post('/signup', (req, res, next) => {
//   User.create(req.body)
//     .then(user => {
//       req.login(user, err => (err ? next(err) : res.json(user)))
//     })
//     .catch(err => {
//       if (err.name === 'SequelizeUniqueConstraintError') {
//         res.status(401).send('User already exists')
//       } else {
//         next(err)
//       }
//     })
// })




router.post('/logout', (req, res) => {
  // I would recommend using passport's req.login here instead -- KHLG
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
