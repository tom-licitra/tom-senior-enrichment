const Sequelize = require('sequelize')

const conn = require('./conn');

const School = conn.define('school', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING
    // add validation
  },
  zip_code: {
    type: Sequelize.INTEGER
    // add validation
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = School;
