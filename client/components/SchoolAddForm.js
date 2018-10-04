import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createSchool } from '../store/schools';

class SchoolAddForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault();
    this.props.createSchool(this.state)
    this.props.history.push('/schools');
  }

  render () {
    return (
      <div>
        <div className="toolBar">
          <div className="pageTitle">Add New School</div>
          <div className="toolButtons">
            <button type="submit" onClick={this.handleSubmit}>Save School</button>
            <Link to="/schools"><button type="button">Return to Schools</button></Link>
          </div>
        </div>
        <div className="schoolForm">
          <form onSubmit={this.handleSubmit}>
            <div>Name</div>
            <input name="name" value={this.state.name} onChange={this.handleChange} />
            <br />
            <div>Address</div>
            <input name="address" value={this.state.address} onChange={this.handleChange} />
            <br />
            <div>City</div>
            <input name="city" value={this.state.city} onChange={this.handleChange} />
            <br />
            <div>State</div>
            <input name="state" value={this.state.state} onChange={this.handleChange} />
            <br />
            <div>Zip Code</div>
            <input name="zipCode" value={this.state.zipCode} onChange={this.handleChange} />
            <br />
            <div>Description</div>
            <textarea rows="6" cols="80" name="description" value={this.state.description} onChange={this.handleChange} />
            <br />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.props.history
})

const mapDispatchToProps = (dispatch) => ({
  createSchool: (data) => dispatch(createSchool(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolAddForm);
