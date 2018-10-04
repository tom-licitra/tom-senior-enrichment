import React from 'react';
import { Link } from 'react-router-dom';

const SchoolStudents = ({ handleEnrollment, updateStudent, deleteStudent, school, potentialStudents, students }) => {
  return (
    <div className="schoolFormStudents">
      <form onSubmit={handleEnrollment}>
        <div>Enroll new student</div>
        <select name="studentId" >
          {
          potentialStudents.map( student => { return (
          <option key={student.id} value={student.id}>
            {student.firstName} {student.lastName}
          </option>)})
          }
        </select>
        <button id="enrollButton" type="submit">Enroll Student</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Unenroll</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {
        students.map( student => (
          <tr key={student.id}>
            <td><Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link></td>
            <td><button type="button" onClick={() => updateStudent(student.id, {schoolId: '0'})}>Unenroll Student</button></td>
            <td><button type="button" onClick={() => deleteStudent(student)}>Delete Student</button></td>
          </tr>))
        }
        </tbody>
      </table>
    </div>
  )
}

export default SchoolStudents;
