import React from 'react';
import { connect } from 'react-redux';

const Schools = ({ schools }) => {
  if (schools.length > 0) {
    return (
      <div id="schools">
        <div className="schoolListItem">{schools[0].name}</div>
        <div className="schoolListItem">{schools[1].name}</div>
      </div>
    )
  }
  return (
    <div id="schools" />
  )
}

const mapStateToProps = (state) => ({schools: state.schools})

export default connect(mapStateToProps)(Schools);
