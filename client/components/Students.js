import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentTable from './StudentTable';

const Students = ({ students }) => {
  if (students.length > 0) {
    return (
      <div id="students">
        <button type="button"><Link to="/students/create">Add new student</Link></button>
        <StudentTable students={students} />
      </div>
    )
  }
  return (
    <div id="students" />
  )
}

const mapStateToProps = (state) => ({students: state.students})

export default connect(mapStateToProps)(Students);
