import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { sortStudents } from '../store/students';

class StudentTable extends Component {
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
    const { sortStudents } = this.props;
    sortStudents(_fieldName, this.state);
    this.setState({
      fieldName: _fieldName,
      asc: fieldName === _fieldName ? !asc : true
    })
  }

  render () {
    const { students } = this.props;
    const { fieldName, asc } = this.state;
    return (
      <table className="studentTable">
        <thead>
          <tr>
            <th onClick={() => this.handleSort('lastName')}>Last Name {fieldName === 'lastName' ? <img src="/sort-default.png" /> : ""}</th>
            <th onClick={() => this.handleSort('firstName')}>First Name {fieldName === 'firstName' ? <img src="/sort-default.png" /> : ""}</th>
            <th onClick={() => this.handleSort('gpa')}>GPA {fieldName === 'gpa' ? <img src="/sort-default.png" /> : ""}</th>
            <th onClick={() => this.handleSort('schoolName')}>School {fieldName === 'schoolName' ? <img src="/sort-default.png" /> : ""}</th>
            <th>Edit Student</th>
          </tr>
        </thead>
        <tbody>
          {
          students.map( student => (
            <tr key={student.id}>
              <td><Link to={`/students/${student.id}`}>{student.lastName}</Link></td>
              <td>{student.firstName}</td>
              <td>{student.gpa}</td>
              <td>{student.school ? student.school.name : 'Not enrolled'}</td>
              <td><button type="button"><Link to={`/students/${student.id}/edit`}>Edit</Link></button></td>
            </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({ students: ownProps.students});

const mapDispatchToProps = (dispatch) => ({
  sortStudents: (fieldName, tableSort) => dispatch(sortStudents(fieldName, tableSort))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentTable);
