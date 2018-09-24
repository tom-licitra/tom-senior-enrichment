import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentListItem from './StudentListItem';

const Students = ({ students }) => {
  const viewLength = 24;
  if (students.length > 0) {
    return (
      <div id="students">
        <button type="button"><Link to="/students/create">Add new student</Link></button>
        {
        students.slice(0,viewLength).map( student => <StudentListItem key={student.id} student={student} />)
        }
      </div>
    )
  }
  return (
    <div id="students" />
  )
}

const mapStateToProps = (state) => ({students: state.students})

export default connect(mapStateToProps)(Students);
