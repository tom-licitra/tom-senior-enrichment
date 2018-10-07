import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateStudent, deleteStudent } from '../store/students';

class StudentEditForm extends Component {
  constructor (props) {
    super(props);
    const { student } = props;
    this.state = {
      firstName: student.firstName,
      lastName: student.lastName,
      gpa: student.gpa,
      schoolId: student.schoolId
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
    const { updateStudent, history } = this.props
    updateStudent(this.props.student.id, this.state);
    history.push(`/students/${this.props.student.id}`);
  }

  render () {
    const { student, schools, history, deleteStudent } = this.props;
    return (
      <div>
        <div className="toolBar">
          <div className="pageTitle">{student.firstName} {student.lastName}</div>
          <div className="toolButtons">
            <button type="submit" style={{"background-color": "#c6ecc6"}} onClick={this.handleSubmit}>Save Changes</button>
            <button type="button" style={{"background-color": "#ffcccc"}} onClick={() => deleteStudent(student, history)}>Delete Student</button>
            <Link to={`/students/${student.id}`}><button type="button">Return to Student</button></Link>
          </div>
        </div>
        <div className="studentForm">
          <form>
            <div>First Name</div>
            <input name="firstName" value={this.state.firstName} onChange={this.handleChange} />
            <div>Last Name</div>
            <input name="lastName" value={this.state.lastName} onChange={this.handleChange} />
            <div>GPA</div>
            <input name="gpa" value={this.state.gpa} onChange={this.handleChange} />
            <div>Enrolled at</div>
              <select name="schoolId" defaultValue={student.school ? student.school.id : 0} onChange={this.handleChange}>
                <option value={0}>Not enrolled</option>
                {
                  schools.map( school => { return (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>)})
                }
              </select>
          </form>
        </div>
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
  updateStudent: (id, data) => dispatch(updateStudent(id, data)),
  deleteStudent: (student, history) => dispatch(deleteStudent(student, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentEditForm);
