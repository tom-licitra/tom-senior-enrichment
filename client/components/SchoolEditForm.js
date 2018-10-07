import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateSchool, deleteSchool } from '../store/schools';
import { updateStudent, deleteStudent } from '../store/students';
import SchoolStudents from './SchoolStudents';

class SchoolEditForm extends Component {
  constructor (props) {
    super(props);
    const { school } = props;
    this.state = {
      name: school.name,
      address: school.address,
      city: school.city,
      state: school.state,
      zipCode: school.zipCode,
      description: school.description
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnrollment = this.handleEnrollment.bind(this);
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const { school } = this.props;
    this.props.updateSchool(school.id, this.state);
    this.props.history.push(`/schools/${school.id}`);
  }

  handleEnrollment (evt) {
    evt.preventDefault();
    const { updateStudent, school } = this.props;
    updateStudent(evt.target.studentId.value, {schoolId: school.id});
  }

  render () {
    const { potentialStudents, school, history } = this.props;
    return (
      <div id="schoolEditor">
        <div className="toolBar">
          <div className="pageTitle">{school.name}</div>
          <div className="toolButtons">
            <button type="submit" style={{"background-color": "#c6ecc6"}} onClick={this.handleSubmit}>Save Changes</button>
            <Link to={`/students/create?schoolId=${school.id}`}><button type="button">Add new student</button></Link>
            <button type="button" style={{"background-color": "#ffcccc"}} onClick={() => this.props.deleteSchool(school, history)}>Delete School</button>
            <Link to={`/schools/${school.id}`}><button type="button">Return to School</button></Link>
          </div>
        </div>
        <div className="schoolForm">
          <form>
            <div>Name</div>
            <input name="name" value={this.state.name} onChange={this.handleChange} />
            <div>Address</div>
            <input name="address" value={this.state.address} onChange={this.handleChange} />
            <div>City</div>
            <input name="city" value={this.state.city} onChange={this.handleChange} />
            <div>State</div>
            <input name="state" value={this.state.state} onChange={this.handleChange} />
            <div>Zip Code</div>
            <input name="zipCode" value={this.state.zipCode} onChange={this.handleChange} />
            <div>Description</div>
            <textarea rows="6" cols="40" name="description" value={this.state.description} onChange={this.handleChange} />
          </form>
          <SchoolStudents
            handleEnrollment={this.handleEnrollment}
            updateStudent={this.props.updateStudent}
            deleteStudent={this.props.deleteStudent}
            school={school}
            potentialStudents={potentialStudents}
            students={school.students} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  schools: state.schools,
  potentialStudents: state.students.filter(student => {
    if (student.school) { return student.school.id !== ownProps.school.id }
    else { return true}
  }),
  school: ownProps.school,
  history: ownProps.props.history
})

const mapDispatchToProps = (dispatch) => ({
  updateSchool: (id, data) => dispatch(updateSchool(id, data)),
  deleteSchool: (school, history) => dispatch(deleteSchool(school, history)),
  updateStudent: (id, data) => dispatch(updateStudent(id, data)),
  deleteStudent: (student, history) => dispatch(deleteStudent(student, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolEditForm);
