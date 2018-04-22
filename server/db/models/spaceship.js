const Sequelize = require('sequelize');
const db = require('../db.js');
const Review  = require('./review');

console.log('this is our review model imported in spaceship', Review);

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
        allowNull: true
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
    },
    avgRating: {
        type: Sequelize.INTEGER,
        defaultValue: 0

        // type: Sequelize.VIRTUAL,
        // defaultValue: 0,
        // get () {
        //     Review.findAll({
        //         where: { spaceshipId: this.id }
        //     })
        //     .then((reviews) => {
        //         let ratings = []
        //         reviews.map((reviewObj) => {
        //             ratings.push(reviewObj.rating)
        //         })
        //         let avg = ratings.reduce((a, b) => a + b, 0) / ratings.length
        //         return avg.get();
        //     })
        // }
            //     let ratings = []
            //     reviews.map((reviewObj) => {
            //         ratings.push(reviewObj.rating)
            //     })
            //     console.log('THESE ARE THE RATINGS:', ratings)
            //     let avg = ratings.reduce((a, b) => a + b, 0) / ratings.length
            //     console.log("OUR AVERAGE", avg)
            //     // return avg;
            //     Spaceship.findById(reviewInstance.spaceshipId)
            // .then((spaceship) => console.log('I AM YOUR FATHER!', spaceship))
    }

});

// Spaceship.prototype.avgRating = function () {
//     Review.findAll({
//         where: { spaceshipId: this.id }
//     })
//     .then((reviews) => {
//         let ratings = []
//         reviews.map((reviewObj) => {
//             ratings.push(reviewObj.rating)
//         })
//         let avg = ratings.reduce((a, b) => a + b, 0) / ratings.length
//         return avg;
//     })
// }


// Spaceship.prototype.avgRating = () => {

// }

module.exports = Spaceship
