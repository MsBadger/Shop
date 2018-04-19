const Sequelize = require('sequelize');
const db = require('../db.js');

const Order = db.define('order', {
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Order;