import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteSchool } from '../store/schools';

const SchoolDetail = ({school, deleteSchool, props}) => {
  return (
    <div className="school">
      <h2>{school.name}</h2>
      <div className="schoolDetails">
        <div>Address: {school.address} {school.city}, {school.state} {school.zipCode}</div>
        <br />
        <div>Description: {school.description}</div>
      </div>
      <br />
      <button type="button" onClick={() => deleteSchool(school, props.history)}>Delete School</button>
      <button type="button"><Link to={props.location.pathname + '/edit'}>Edit School</Link></button>
      <button type="button"><Link to="/schools">Return to Schools</Link></button>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  school: ownProps.school,
  props: ownProps.props
})

const mapDispatchToProps = (dispatch) => ({
  deleteSchool: (school, history) => dispatch(deleteSchool(school, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolDetail);
