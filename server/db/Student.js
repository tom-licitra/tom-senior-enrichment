const Sequelize = require('sequelize');

const conn = require('./conn');
const School = require('./School');

const Student = conn.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gpa: {
    type: Sequelize.DOUBLE
    // add validations
  }
})

Student.belongsTo(School);
School.hasMany(Student);

module.exports = Student;
