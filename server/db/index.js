const School = require('./School');
const Student = require('./Student');
const User = require('./User');
// const syncAndSeed = require('./seed');

module.exports = {
  models: {
    Student,
    School,
    User
  }
}
