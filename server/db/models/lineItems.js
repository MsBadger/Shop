const Sequelize = require('sequelize');
const db = require('../db.js');

const LineItems = db.define('lineItems', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = LineItems;