const Sequelize = require('sequelize')

const conn = require('./conn');

const User = conn.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = User;
