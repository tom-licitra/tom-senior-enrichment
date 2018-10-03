import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentTable from './StudentTable';

const Students = ({ students }) => {
  if (students.length > 0) {
    return (
      <div id="students">
        <div className="toolBar">
          <div className="pageTitle"><b>Students</b></div>
          <div className="toolButtons">
            <Link to="/students/create"><button type="button">Add new student</button></Link>
          </div>
        </div>
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
