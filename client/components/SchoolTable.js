import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SchoolTable = ({ schools }) => {
  return (
    <table className="schoolTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Students Enrolled</th>
          <th>City</th>
          <th>State</th>
          <th>Edit School</th>
        </tr>
      </thead>
      <tbody>
        {
        schools.map( school => (
          <tr key={school.id}>
            <td><Link to={`/schools/${school.id}`}>{school.name}</Link></td>
            <td>{school.students.length}</td>
            <td>{school.city}</td>
            <td>{school.state}</td>
            <td><button type="button"><Link to={`/schools/${school.id}/edit`}>Edit</Link></button></td>
          </tr>
          ))
        }
      </tbody>
    </table>
  )
}

const mapStateToProps = (state) => ({schools: state.schools});

export default connect(mapStateToProps)(SchoolTable);
