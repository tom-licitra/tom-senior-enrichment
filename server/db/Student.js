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
    type: Sequelize.DOUBLE,
    validate: {
      min: 0.00,
      max: 4.50
    },
    get() {
      let stringifiedGpa = String(Math.round(this.getDataValue('gpa') * 100) / 100);
      stringifiedGpa = stringifiedGpa.length > 1 ? stringifiedGpa + '00' : stringifiedGpa + '.00';
      return stringifiedGpa.slice(0, 4)
    }
  }
})

Student.belongsTo(School);
School.hasMany(Student);

module.exports = Student;
