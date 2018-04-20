const Sequelize = require('sequelize');
const db = require('../db.js');
const Spaceship = require('./spaceship');

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
})

Review.afterCreate((reviewInstance) => {

    Promise.all([Review.findAll({
        where: { spaceshipId: reviewInstance.spaceshipId }
    }), Spaceship.findById(reviewInstance.spaceshipId)])
        .then((res) =>
            [[review1, review2, review3], spaceship]

        )

    Review.belongsTo(Spaceship.as 'average')
    Spaceship.setAver({ data })


    // Article.belongsTo(Author, as 'author')
    // article1.setAuthor(athor1)






    // console.log('this is the spaceship id: ', reviewInstance.spaceshipId)
    // Review.findAll({
    //     where: { spaceshipId: reviewInstance.spaceshipId }
    // })
    // .then((reviews) => {
    //     let ratings = []
    //     reviews.map((reviewObj) => {
    //         ratings.push(reviewObj.rating)
    //     })
    //     console.log('THESE ARE THE RATINGS:', ratings)
    //     let avg = ratings.reduce((a, b) => a + b, 0) / ratings.length
    //     console.log("OUR AVERAGE", avg)
    //     // return avg;
    //     Spaceship.findById(reviewInstance.spaceshipId)
    //         .then((spaceship) => console.log('I AM YOUR FATHER!', spaceship))
    // })
    // .then((avg) => Spaceship.findById(
    //     reviewInstance.spaceshipId
    // ))
    // .then(spaceship => console.log('I AM YOUR FATHER!', spaceship))
})

module.exports = Review;


