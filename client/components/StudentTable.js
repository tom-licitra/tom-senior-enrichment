import React from 'react';
import { Link } from 'react-router-dom';

const StudentTable = ({students}) => {
  return (
    <table className="studentTable">
      <thead>
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>GPA</th>
          <th>School</th>
          <th>Edit Student</th>
        </tr>
      </thead>
      <tbody>
        {
        students.map( student => (
          <tr key={student.id}>
            <td><Link to={`/students/${student.id}`}>{student.lastName}</Link></td>
            <td>{student.firstName}</td>
            <td>{student.gpa}</td>
            <td>{student.school ? student.school.name : 'Not enrolled'}</td>
            <td><button type="button"><Link to={`/students/${student.id}/edit`}>Edit</Link></button></td>
          </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default StudentTable;
