/*eslint-disable react/prefer-stateless-function*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom'

import { getSchools, getStudents } from '../store';
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
        <Nav />
        <hr />
        <Route path="/schools" exact component={Schools} />
        <Route path="/students" exact component={Students} />
        <Route path="/students/:id" component={Student} />
        <Route path="/schools/:id" component={School} />
        <hr />
      </div>
    </Router>)
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSchools: () => dispatch(getSchools()),
  getStudents: () => dispatch(getStudents())
})

export default connect(null, mapDispatchToProps)(Main);
