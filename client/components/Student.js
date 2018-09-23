import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import StudentDetail from './StudentDetail';
import StudentForm from './StudentForm';
import { deleteStudent, updateStudent, createStudent } from '../store';

const Student = ({ student, deleteStudent, updateStudent }) => {
  if ( student ) {
    return (
      <Router>
        <Switch>
          <Route path="/students/create" component={<div>Hello</div>} />
          <Route exact path="/students/:id" render={(props) => <StudentDetail props={props} student={student} deleteStudent={deleteStudent} /> } />
          <Route path="/students/:id/edit" render={ () => <StudentForm student={student} deleteStudent={deleteStudent} updateStudent={updateStudent} /> } />
        </Switch>
      </Router>
    )
  }
  return (
    <Router>
      <Switch>
        <Route path="/students/create" render={ () => <StudentForm createStudent={createStudent} />} />
        <div className="student" />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state, ownProps) => {
  return ({ student: state.students.filter( stud => stud.id === ownProps.match.params.id * 1)[0] })
}

const mapDispatchToProps = (dispatch) => ({
  deleteStudent: (student) => dispatch(deleteStudent(student)),
  updateStudent: (id, student) => dispatch(updateStudent(id, student)),
  createStudent: (data) => dispatch(createStudent(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Student);
