import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteStudent } from '../store/students';

const StudentDetail = ({ location, history, student, deleteStudent }) => {
  if (student) {
    return (
      <div className="student">
        <h2>{student.firstName} {student.lastName}</h2>
        <div className="studentDetails">
          <div>Current GPA: {student.gpa}</div>
          <br />
          <div>Current School: {student.school ? student.school.name : "Not enrolled"}</div>
        </div>
        <br />
        <button type="button" onClick={() => deleteStudent(student, history)}>Delete Student</button>
        <button type="button"><Link to={location.pathname + '/edit'}>Edit Student</Link></button>
        <button type="button"><Link to="/students">Return to Students</Link></button>
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
