/*eslint-disable react/prefer-stateless-function*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom'

import { getSchools } from '../store/schools';
import { getStudents } from '../store/students';
import Nav from './Nav';
import Schools from './Schools';
import Students from './Students';
import Student from './Student';
import School from './School';

class Main extends Component {
  componentDidMount () {
    this.props.getSchools();
    this.props.getStudents();
  }

  render () {
    return (
    <Router>
      <div id="app">
        <Route path="/" render={(props) => <Nav props={props} /> } />
        <Route path="/schools" exact render={(props) => <Schools props={props} /> } />
        <Route path="/students" exact component={Students} />
        <Route path="/students/:id" component={Student} />
        <Route path="/schools/:id" component={School} />
      </div>
    </Router>)
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSchools: () => dispatch(getSchools()),
  getStudents: () => dispatch(getStudents())
})

export default connect(null, mapDispatchToProps)(Main);
