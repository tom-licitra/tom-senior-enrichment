import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SchoolTable from './SchoolTable';


const Schools = ({ schools }) => {
  return (
    <div id="schools">
      <button type="button"><Link to="/schools/create">Add new school</Link></button>
      {schools.length > 0 ? <SchoolTable /> : null}
    </div>
  )
}

const mapStateToProps = (state) => ({schools: state.schools})

export default connect(mapStateToProps)(Schools);
