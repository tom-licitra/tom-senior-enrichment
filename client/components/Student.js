import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import StudentDetail from './StudentDetail';
import StudentEditForm from './StudentEditForm';
import StudentAddForm from './StudentAddForm';
import { deleteStudent } from '../store';

const Student = ({ student, deleteStudent }) => {
  if ( student ) {
    return (
      <Router>
        <Switch>
          <Route exact path="/students/:id" render={(props) => {return (<StudentDetail props={props} student={student} deleteStudent={deleteStudent} />)} } />
          <Route exact path="/students/:id/edit" render={(props) => <StudentEditForm student={student} props={props} /> } />
        </Switch>
      </Router>
    )
  }
  return (
    <Router>
      <Switch>
        <Route path="/students/create" render={(props) => <StudentAddForm props={props} />} />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state, ownProps) => {
  return ({ student: state.students.filter( stud => stud.id === ownProps.match.params.id * 1)[0] })
}

const mapDispatchToProps = (dispatch) => ({
  deleteStudent: (student) => dispatch(deleteStudent(student))
})

export default connect(mapStateToProps, mapDispatchToProps)(Student);
