import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SchoolDetail = ({school, deleteSchool, props}) => {
  return (
    <div className="school">
      <h2>{school.name}</h2>
      <div className="schoolDetails">
        <div>Address: {school.address} {school.city}, {school.state} {school.zip_code}</div>
        <br />
        <div>Description: {school.description}</div>
      </div>
      <br />
      <button type="button" onClick={() => deleteSchool(school)}>Delete Student</button>
      <button type="button"><Link to={props.location.pathname + '/edit'}>Edit School</Link></button>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  school: ownProps.school,
  props: ownProps.props
})

const mapDispatchToProps = (dispatch) => ({
  deleteSchool: (school) => console.log(`I could delete ${school.name} if you connect me`)
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolDetail);
