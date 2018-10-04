import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <div>
        <div className="toolBar">
          <div className="pageTitle">Add New Student</div>
          <div className="toolButtons">
            <button type="submit" onClick={this.handleSubmit}>Save Student</button>
            <Link to="/students"><button type="button">Return to Students</button></Link>
          </div>
        </div>
        <div className="studentForm">
          <form onSubmit={this.handleSubmit}>
            <div>First Name</div>
            <input name="firstName" value={this.state.firstName} onChange={this.handleChange} />
            <div>Last Name</div>
            <input name="lastName" value={this.state.lastName} onChange={this.handleChange} />
            <div>GPA</div>
            <input name="gpa" value={this.state.gpa} onChange={this.handleChange} />
            <div>Enrolled at</div>
              <select name="schoolId" defaultValue={schoolId} onChange={this.handleChange}>
                <option value={0}>Not enrolled</option>
                {schools.map( school => { return (
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
  history: ownProps.props.history,
  schoolId: ownProps.props.location.search.length > 0 ? ownProps.props.location.search.split("=").pop() : 0
})

const mapDispatchToProps = (dispatch) => ({
  createStudent: (data) => dispatch(createStudent(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentAddForm);
