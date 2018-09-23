const Sequelize = require('sequelize');
const conn = new Sequelize( process.env.DATABASE_URL || 'postgres://localhost/academics', {
  logging: false
});

module.exports = conn;
