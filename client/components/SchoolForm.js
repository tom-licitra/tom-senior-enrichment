import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { updateSchool } from '../store';

class SchoolForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: props.school.name,
      address: props.school.address,
      city: props.school.city,
      state: props.school.state,
      zipCode: props.school.zip_code,
      description: props.school.description
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
    this.props.updateSchool(this.props.school.id, this.state);
    this.props.history.push(`/schools/${this.props.school.id}`);
  }

  render () {
    // const { school, schools } = this.props;
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
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  schools: state.schools,
  school: ownProps.school,
  history: ownProps.props.history
})

const mapDispatchToProps = (dispatch) => ({
  updateSchool: (id, data) => console.log(`Would update ${data.name}`)
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolForm);
