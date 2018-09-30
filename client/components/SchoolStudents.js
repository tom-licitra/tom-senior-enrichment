import React from 'react';
import { Link } from 'react-router-dom';

const SchoolStudents = ({ handleEnrollment, updateStudent, deleteStudent, school, potentialStudents, students }) => {
  return (
    <div className="schoolFormStudents">
      <button type="button"><Link to={`/students/create?schoolId=${school.id}`}>Add new student</Link></button>
      <form onSubmit={handleEnrollment}>
        <label>Enroll student</label>
        <select name="studentId" >
          {
          potentialStudents.map( student => { return (
          <option key={student.id} value={student.id}>
            {student.firstName} {student.lastName}
          </option>)})
          }
        </select>
        <button type="submit">Enroll Student</button>
      </form>
      <ul>
        {
        students.map( student => (
          <li key={student.id}>
            <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
            <button type="button" onClick={() => updateStudent(student.id, {schoolId: '0'})}>Unenroll Student</button>
            <button type="button" onClick={() => deleteStudent(student)}>Delete Student</button>
          </li>))
        }
      </ul>
    </div>
  )
}

export default SchoolStudents;
