const Sequelize = require('sequelize');
const db = require('../db.js');

const Review = db.define('review', {
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Rewiew;
