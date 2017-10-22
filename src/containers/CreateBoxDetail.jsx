import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createBox, fetchBoxes } from '../actions';

class CreateBoxDetail extends Component {

  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onBoxNameChange = this.onBoxNameChange.bind(this);
    this.onOpenDateChange = this.onOpenDateChange.bind(this);
    this.state = {
      boxName: '',
      openDate: new Date().toISOString()
    }
  }

  onSubmit(event){
    event.preventDefault();

    this.props.createBox({name: this.state.boxName, openDate: this.state.openDate})
    this.props.fetchBoxes()
  }

  onBoxNameChange(event){
    this.setState({boxName: event.target.value, openDate: this.state.openDate})
  }

  onOpenDateChange(event){
    this.setState({openDate: event.target.value, boxName: this.state.boxName})
  }

  render(){
    const box = this.props.box
    if (box) {
      return <div className="hidden" />
    }
    return (
      <div className="box-detail">
        <h3>Create a new box!</h3>
        <form onSubmit={this.onSubmit} className="form-inline">
          <div className="form-group">
            <label htmlFor="boxName">Box name:</label>
            <input
              onChange={this.onBoxNameChange}
              type="text"
              className="form-control"
              id="boxName"
              value={this.state.boxName} />
          </div>
          <div className="form-group">
            <label htmlFor="passphrase">Passphrase:</label>
            <input type="password" className="form-control" id="passphrase" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="openDate">Open Date:</label>
            <input
              type="text"
              className="form-control"
              id="openDate"
              onChange={this.onOpenDateChange}
              value={this.state.openDate}/>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createBox, fetchBoxes }, dispatch);
}

function mapStateToProps(state){
  return {
    box: state.selectedBox
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBoxDetail)
