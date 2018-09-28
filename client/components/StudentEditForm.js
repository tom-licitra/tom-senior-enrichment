import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStudent } from '../store';

class StudentEditForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: props.student.firstName,
      lastName: props.student.lastName,
      gpa: props.student.gpa,
      schoolId: props.student.schoolId
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault();
    this.props.updateStudent(this.props.student.id, this.state);
    this.props.history.push(`/students/${this.props.student.id}`);
  }

  render () {
    const { student, schools } = this.props;
    return (
      <div className="studentForm">
        <button type="button"><Link to={`/students/${student.id}`}>Return to Student</Link></button>
        <form onSubmit={this.handleSubmit}>
          <label>First Name</label>
          <input name="firstName" value={this.state.firstName} onChange={this.handleChange} />
          <br />
          <label>Last Name</label>
          <input name="lastName" value={this.state.lastName} onChange={this.handleChange} />
          <br />
          <label>GPA</label>
          <input name="gpa" value={this.state.gpa} onChange={this.handleChange} />
          <br />
          <label>Enrolled at</label>
            <select name="schoolId" defaultValue={student.school ? student.school.id : null} onChange={this.handleChange}>
              <option value={0}>Not enrolled</option>
              {
                schools.map( school => { return (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>)})
              }
            </select>
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  schools: state.schools,
  student: ownProps.student,
  history: ownProps.props.history
})

const mapDispatchToProps = (dispatch) => ({
  updateStudent: (id, data) => dispatch(updateStudent(id, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentEditForm);
