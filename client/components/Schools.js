import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Schools = ({ schools }) => {
  if (schools.length > 0) {
    return (
      <div id="schools">
        <button type="button"><Link to="/schools/create">Add new school</Link></button>
        {
        schools.map( school => <div className="schoolListItem" key={school.id}><Link to={`/schools/${school.id}`}>{school.name}</Link></div>)
        }
      </div>
    )
  }
  return (
    <div id="schools" />
  )
}

const mapStateToProps = (state) => ({schools: state.schools})

export default connect(mapStateToProps)(Schools);
