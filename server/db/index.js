const School = require('./School');
const Student = require('./Student');
const syncAndSeed = require('./seed');

module.exports = {
  models: {
    Student,
    School
  },
  syncAndSeed
}
