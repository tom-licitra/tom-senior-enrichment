import React from 'react';

const StudentDetail = ({ student, deleteStudent }) => {
  return (
    <div className="student">
      <h2>{student.firstName} {student.lastName}</h2>
      <div className="studentDetails">
        <div>Current GPA: {student.gpa}</div>
      </div>
      <br />
      <button type="button" onClick={() => deleteStudent(student)}>Delete Student</button>
    </div>
  )
}

export default StudentDetail;
