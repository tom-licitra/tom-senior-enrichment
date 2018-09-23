import React from 'react';
import { Link } from 'react-router-dom';

const StudentListItem = ({ student }) => {
  return (
    <div className="studentListItem">
      <h3><Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link></h3>
    </div>
  )
}

export default StudentListItem;
