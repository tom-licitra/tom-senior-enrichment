import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteSchool } from '../store/schools';
import StudentTable from './StudentTable';

const SchoolDetail = ({school, schoolStudents, deleteSchool, props}) => {
  return (
    <div className="school">
      <div className="toolBar">
        <div className="pageTitle">{school.name}</div>
        <div className="toolButtons">
          <button type="button" onClick={() => deleteSchool(school, props.history)}>Delete School</button>
          <Link to={props.location.pathname + '/edit'}><button type="button">Edit School</button></Link>
          <Link to="/schools"><button type="button">Return to Schools</button></Link>
        </div>
      </div>
      <div className="schoolDetails">
        <div><b>Address:</b> {school.address}, {school.city}, {school.state} {school.zipCode}</div>
        <br />
        <div><b>Description:</b> {school.description}</div>
        <br />
        <div><b>Current enrollment:</b> {school.students.length} {school.students.length === 1 ? "student" : "students"}</div>
      </div>
      <StudentTable students={schoolStudents} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  school: ownProps.school,
  props: ownProps.props,
  schoolStudents: state.students.filter( student => student.school && student.school.id === ownProps.school.id)
})

const mapDispatchToProps = (dispatch) => ({
  deleteSchool: (school, history) => dispatch(deleteSchool(school, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolDetail);
