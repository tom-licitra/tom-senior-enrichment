import React, { Component } from 'React';
import { connect } from 'react-redux';
// import { updateStudent } from '../store';

class StudentForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      schoolId: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  

  componentDidMount () {
    if (this.props.student) {
      this.setState({
        firstName: this.props.student.firstName,
        lastName: this.props.student.lastName,
        gpa: this.props.student.gpa,
        schoolId: this.props.student.schoolId
      })
    }
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault();
    console.log("IN HANDLE SUBMIT");
    if (this.props.createStudent) {
      console.log("IN CREATE LOOP");
      this.props.createStudent(this.state);
    }
    else {
      this.props.updateStudent(this.props.student.id, this.state);
    }
  }

  render () {
    const { student, schools } = this.props;
    return (
      <div className="studentForm">
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
            <select name="schoolId" onChange={this.handleChange}>
              {/* <option value={student.schoolId}>{student.school.name}</option> */}
              {schools.map( school => <option key={school.id} value={school.id}>{school.name}</option>)}
            </select>
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  schools: state.schools,
  student: ownProps.student
})

// const mapDispatchToProps = (dispatch) => ({
//   updateStudent: (student) => dispatch(updateStudent(student))
// })

// export default StudentForm

export default connect(mapStateToProps)(StudentForm);
