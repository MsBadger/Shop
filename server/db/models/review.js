const Sequelize = require('sequelize');
const db = require('../db.js');
const Spaceship = require('./spaceship');

console.log("spaceship immediately after require: ", Spaceship);

const Review = db.define('review', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            len: {
                args: [1, 2018],
                msg: 'Listen, 1 or 200'
            }
        }
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    snippet: {
        type: Sequelize.VIRTUAL,
        get() {
            if (!this.getDataValue('body')) {
                return '';
            } else {
                return this.getDataValue('body').slice(0, 100) + '...';
            }
        }
    }
    // ,
    // avgRating: {
    //     type: Sequelize.INTEGER,
    //     defaultValue: 0
    // }
})

// Review.afterCreate((reviewInstance) => {
//     console.log('this is our imported spaceship model', Spaceship)

//     Review.findAll({
//         where: { spaceshipId: reviewInstance.spaceshipId }
//     })


//         .then((reviews) =>{
//             let ratings = []
//             reviews.map((reviewObj) => {
//                 ratings.push(reviewObj.rating)
//             })
//             let avg = ratings.reduce((a, b) => a + b, 0) / ratings.length
//             let roundedAvg = Math.ceil(avg);

//             // return reviewInstance.avgRating = 8

//             // spaceship.avgRating = roundedAvg;

//             // spaceship.save()

//             Spaceship.update(
//                {avgRating: roundedAvg},
//                {where: {id: reviewInstance.spaceshipId}}
//             )
//         })
//         .then((updatedReview) => console.log('this is the updated review!', updatedReview))
  
// })






//     console.log('this is the spaceship id: ', reviewInstance.spaceshipId)
//     Review.findAll({
//         where: { spaceshipId: reviewInstance.spaceshipId }
//     })
//     .then((reviews) => {
//         let ratings = []
//         reviews.map((reviewObj) => {
//             ratings.push(reviewObj.rating)
//         })
//         console.log('THESE ARE THE RATINGS:', ratings)
//         let avg = ratings.reduce((a, b) => a + b, 0) / ratings.length
//         console.log("OUR AVERAGE", avg)
//         // return avg;
//         Spaceship.findById(reviewInstance.spaceshipId)
//             .then((spaceship) => console.log('I AM YOUR FATHER!', spaceship))
//     })
//     .then((avg) => Spaceship.findById(
//         reviewInstance.spaceshipId
//     ))
//     .then(spaceship => console.log('I AM YOUR FATHER!', spaceship))
// })

module.exports = Review;


