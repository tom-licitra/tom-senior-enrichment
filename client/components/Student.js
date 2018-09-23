import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import StudentDetail from './StudentDetail';
import StudentForm from './StudentForm';
import { deleteStudent, updateStudent } from '../store';

const Student = ({ student, deleteStudent, updateStudent }) => {
  if ( student ) {
    return (
      <Router>
        <Switch>
          <Route exact path="/students/:id" render={() => <StudentDetail student={student} deleteStudent={deleteStudent} /> } />
          <Route path="/students/:id/edit" render={ () => <StudentForm student={student} deleteStudent={deleteStudent} updateStudent={updateStudent} /> } />
        </Switch>
      </Router>
    )
  }
  return (<div className="student" />)
}

const mapStateToProps = (state, ownProps) => {
  return ({ student: state.students.filter( stud => stud.id === ownProps.match.params.id * 1)[0] })
}

const mapDispatchToProps = (dispatch) => ({
  deleteStudent: (student) => dispatch(deleteStudent(student)),
  updateStudent: (id, student) => dispatch(updateStudent(id, student))
})

export default connect(mapStateToProps, mapDispatchToProps)(Student);
