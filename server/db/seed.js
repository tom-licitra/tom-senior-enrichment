const Chance = require('chance');
const chance = new Chance();

const conn = require('./conn');
const School = require('./School');
const Student = require('./Student');

const schoolCount = 5;
const studentCount = 25;

const createSchools = (num) => {
  let schools = [];
  for (let i = 0; i < num; i++) {
    let newSchool = {}
    newSchool.name = `${chance.name()} ${Math.random() > 0.5 ? 'Elementary' : 'High'} School`;
    newSchool.address = chance.address();
    newSchool.city = chance.city();
    newSchool.state = chance.state();
    newSchool.zip_code = chance.zip();
    newSchool.description = chance.paragraph({sentences: 2});
    schools.push(newSchool);
  }
  return schools;
}

const createStudents = (num) => {
  let students = [];
  for (let i = 0; i < num; i++) {
    let newStudent = {}
    newStudent.firstName = chance.first();
    newStudent.lastName = chance.last();
    newStudent.gpa = Math.floor(( 4 - (Math.random() * 2)) * 100) / 100;
    students.push(newStudent);
  }
  return students;
}

const sync = () => conn.sync({force: true});

const seed = async () => {
  const schools = await Promise.all(createSchools(schoolCount).map( school => {
      return School.create(school)
    }))
  const students = await Promise.all(createStudents(studentCount).map( student => {
      return Student.create(student)
    }))
  Promise.all(students.map( student => {
    if (student.id % 8 !== 0) {
        student.schoolId = Math.floor(Math.random() * schools.length) + 1;
        student.save();
      }
  }))
}

const syncAndSeed = () => {
  sync()
    .then(() => seed())
}

syncAndSeed();
