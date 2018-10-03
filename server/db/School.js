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
    type: Sequelize.STRING,
    validate: {
      len: [2,2]
    },
    set(str) {
      this.setDataValue('state', str.toUpperCase())
    }
  },
  zipCode: {
    type: Sequelize.INTEGER,
    validate: {
      len: 5
    }
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = School;
