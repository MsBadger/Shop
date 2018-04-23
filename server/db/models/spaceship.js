const Sequelize = require('sequelize');
const db = require('../db.js');
const { Review } = require('./index.js')

const Spaceship = db.define('spaceship', {
    title: {
        type: Sequelize.STRING,
        allowNull: false // '' is valid still -- KHLG
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
        allowNull: true
    },
    vesselType: {
        type: Sequelize.STRING, // enum? -- KHLG
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
    },
    // avgRating: {
    //     type: Sequelize.NUMBER,
    //     default: 0,

    // } // this should work with a hook for every add/update of review -- KHLG


})

// Spaceship.prototype.avgRating = () => {

// }

module.exports = Spaceship
