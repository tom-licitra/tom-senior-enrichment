import React from 'react';
import { Link } from 'react-router-dom';

const StudentDetail = ({ props, student, deleteStudent }) => {
  return (
    <div className="student">
      <h2>{student.firstName} {student.lastName}</h2>
      <div className="studentDetails">
        <div>Current GPA: {student.gpa}</div>
      </div>
      <br />
      <button type="button" onClick={() => deleteStudent(student)}>Delete Student</button>
      <button type="button"><Link to={props.location.pathname + '/edit'}>Edit Student</Link></button>
    </div>
  )
}

export default StudentDetail;
