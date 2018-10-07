import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { sortSchools } from '../store/schools';

class SchoolTable extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      fieldName: '',
      asc: true
    }
    this.handleSort = this.handleSort.bind(this);
  }

  handleSort (_fieldName) {
    const { fieldName, asc } = this.state;
    const { sortSchools } = this.props;
    sortSchools(_fieldName, this.state);
    this.setState({
      fieldName: _fieldName,
      asc: fieldName === _fieldName ? !asc : true
    })
  }

  render () {
    const { schools, sortSchools } = this.props;
    const { fieldName, asc } = this.state;
    return (
      <table className="schoolTable">
        <thead>
          <tr>
            <th onClick={() => this.handleSort('name')}>Name {fieldName === 'name' ? <img src="/sort-default.png" /> : ""}</th>
            <th onClick={() => this.handleSort('enrollment')}>Students Enrolled {fieldName === 'enrollment' ? <img src="/sort-default.png" /> : ""}</th>
            <th onClick={() => this.handleSort('city')}>City {fieldName === 'city' ? <img src="/sort-default.png" /> : ""}</th>
            <th onClick={() => this.handleSort('state')}>State {fieldName === 'state' ? <img src="/sort-default.png" /> : ""}</th>
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
}

const mapStateToProps = (state) => ({schools: state.schools});

const mapDispatchToProps = (dispatch) => ({
  sortSchools: (fieldName, tableSort) => dispatch(sortSchools(fieldName, tableSort))
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolTable);
