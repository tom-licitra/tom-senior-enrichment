import React from 'react';
import { connect } from 'react-redux';
import { deleteStudent } from '../store';

const Student = ({ student, deleteStudent }) => {
  console.log("In component");
  console.log(student);
  if ( student ) {
    return (
      <div className="student">
        <h2>{student.firstName} {student.lastName}</h2>
        <div className="studentDetails">
          <div>Current GPA: {student.gpa}</div>
        </div>
        <br />
        <button type="button" onClick={() => deleteStudent(student)}>Delete Student</button>
      </div>
    )
  }
  return (<div className="student" />)
}

const mapStateToProps = (state, ownProps) => {
  const student = state.students.filter( stud => stud.id === ownProps.match.params.id * 1)
  return ({ student: student[0] })
}

const mapDispatchToProps = (dispatch) => ({
  deleteStudent: (student) => dispatch(deleteStudent(student))
})

export default connect(mapStateToProps, mapDispatchToProps)(Student);
