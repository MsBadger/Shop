const User = require('./user');
const Spaceship = require('./spaceship');
const Order = require('./order');
const LineItems = require('./lineItems')
// const db = require('../db.js')


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Order.belongsTo(User); // meaning Order will have user_id column and associated methods
User.hasMany(Order);// Adds methods to the user model 

Spaceship.belongsToMany(Order, { through: LineItems })
Order.belongsToMany(Spaceship, { through: LineItems })



module.exports = {
  User, Spaceship, Order, LineItems
}
