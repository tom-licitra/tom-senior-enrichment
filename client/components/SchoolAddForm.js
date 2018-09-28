import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSchool } from '../store';

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
      <div className="schoolForm">
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input name="name" value={this.state.name} onChange={this.handleChange} />
          <br />
          <label>Address</label>
          <input name="address" value={this.state.address} onChange={this.handleChange} />
          <br />
          <label>City</label>
          <input name="city" value={this.state.city} onChange={this.handleChange} />
          <br />
          <label>State</label>
          <input name="state" value={this.state.state} onChange={this.handleChange} />
          <br />
          <label>Zip Code</label>
          <input name="zipCode" value={this.state.zipCode} onChange={this.handleChange} />
          <br />
          <label>Description</label>
          <textarea rows="6" cols="40" name="description" value={this.state.description} onChange={this.handleChange} />
          <br />
          <button type="submit">Submit</button>
        </form>
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
