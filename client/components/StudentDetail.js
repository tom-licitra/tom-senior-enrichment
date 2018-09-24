import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteStudent } from '../store';

const StudentDetail = ({ props, student, deleteStudent }) => {
  return (
    <div className="student">
      <h2>{student.firstName} {student.lastName}</h2>
      <div className="studentDetails">
        <div>Current GPA: {student.gpa}</div>
        <br />
        <div>Current School: {student.school ? student.school.name : "Not enrolled"}</div>
      </div>
      <br />
      <button type="button" onClick={() => deleteStudent(student)}>Delete Student</button>
      <button type="button"><Link to={props.location.pathname + '/edit'}>Edit Student</Link></button>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  student: ownProps.student,
  props: ownProps.props
});

const mapDispatchToProps = (dispatch) => ({deleteStudent: (student) => dispatch(deleteStudent(student))});

export default connect(mapStateToProps)(StudentDetail);
