const Sequelize = require('sequelize');
const db = require('../db.js');

const Spaceship = db.define('spaceship', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Description coming soon.'
    },
    price: {
        type: Sequelize.DECIMAL(7, 0),
        allowNull: false
    },
    inventory: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            min: { args: 0, msg: 'Please enter integer from 1 to 10' },
            max: { args: 10, msg: 'Please enter integer from 1 to 10' }
        }
    },
    vesselType: {
        type: Sequelize.STRING,
        defaultValue: 'All Purpose'
    },
    capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    priceInMills: {
        type: Sequelize.VIRTUAL,
        get() {
            return this.getDataValue('price') * 1000000;
        }
    },
    image: {
        type: Sequelize.STRING,
        defaultValue: 'http://i66.tinypic.com/2iut2l0.jpg',
        validate: {
            isUrl: true
        }

    }
})

module.exports = Spaceship
