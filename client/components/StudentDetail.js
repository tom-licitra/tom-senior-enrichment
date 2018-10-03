import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteStudent } from '../store/students';

const StudentDetail = ({ location, history, student, deleteStudent }) => {
  if (student) {
    return (
      <div className="student">
        <div className="toolBar">
          <div className="pageTitle">{student.firstName} {student.lastName}</div>
          <div className="toolButtons">
            <button type="button" onClick={() => deleteStudent(student, history)}>Delete Student</button>
            <Link to={location.pathname + '/edit'}><button type="button">Edit Student</button></Link>
            <Link to="/students"><button type="button">Return to Students</button></Link>
          </div>
        </div>
        <div className="studentDetails">
          <div>Current GPA: {student.gpa}</div>
          <br />
          <div>Current School: {student.school ? student.school.name : "Not enrolled"}</div>
        </div>
        <br />
       
      </div>
    )
  }
  else { return <div className="studentNotFound">Student not found</div> }
}

const mapStateToProps = (state, ownProps) => ({
  student: ownProps.student,
  location: ownProps.props.location,
  history: ownProps.props.history
});

const mapDispatchToProps = (dispatch) => ({deleteStudent: (student, history) => dispatch(deleteStudent(student, history))});

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetail);
