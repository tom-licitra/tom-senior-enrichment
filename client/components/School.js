import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import SchoolDetail from './SchoolDetail';
import SchoolForm from './SchoolForm';
import SchoolAddForm from './SchoolAddForm';

const School = ({school}) => {
  if (school) {
    return (
      <Router>
        <Switch>
          <Route exact path="/schools/:id" render={(props) => <SchoolDetail props={props} school={school}/>} />
          <Route exact path="/schools/:id/edit" render={(props) => <SchoolForm props={props} school={school}/>} />
        </Switch>
      </Router>
    )
  }
  else {
    return (
      <Router>
        <Switch>
          <Route path="/schools/create" render={(props) => <SchoolAddForm props={props} />} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  school: state.schools.filter( school => school.id === ownProps.match.params.id * 1)[0]
})

export default connect(mapStateToProps)(School);
