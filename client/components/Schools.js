import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SchoolTable from './SchoolTable';


const Schools = ({ schools, props }) => {
  return (
    <div id="schools">
      <div className="toolBar">
        <div className="pageTitle"><b>Schools</b></div>
        <div className="toolButtons">
          <Link to="/schools/create"><button type="button">Add new school</button></Link>
        </div>
      </div>
      {schools.length > 0 ? <SchoolTable /> : null}
    </div>
  )
}

const mapStateToProps = (state) => ({schools: state.schools})

export default connect(mapStateToProps)(Schools);
