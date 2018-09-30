import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../store/students';

class StudentAddForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      schoolId: this.props.schoolId
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.props);
  }  

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault();
    if (!this.state.schoolId) {
       const { schoolId, ...stateData } = this.state; // excludes schoolId from req.body
       this.props.createStudent(stateData)
    }
    else { this.props.createStudent(this.state) }
    this.props.history.push('/students');
  }

  render () {
    const { schools, schoolId } = this.props;
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
            <select name="schoolId" defaultValue={schoolId} onChange={this.handleChange}>
              <option value={0}>Not enrolled</option>
              {schools.map( school => { return (
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
  history: ownProps.props.history,
  schoolId: ownProps.props.location.search.length > 0 ? ownProps.props.location.search.split("=").pop() : 0
})

const mapDispatchToProps = (dispatch) => ({
  createStudent: (data) => dispatch(createStudent(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentAddForm);
