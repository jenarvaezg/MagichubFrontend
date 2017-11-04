import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import { DateTimePicker } from 'material-ui-pickers'


import { createBox, fetchBoxes } from './actions';

class CreateBoxForm extends Component {

  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onBoxNameChange = this.onBoxNameChange.bind(this);
    this.onPassphraseChange = this.onPassphraseChange.bind(this);
    this.onOpenDateChange = this.onOpenDateChange.bind(this);
    this.state = {
      boxName: '',
      passphrase: '',
      openDate: new Date().toISOString()
    }
  }

  onSubmit(event){
    event.preventDefault();
    const data = {name: this.state.boxName, openDate: this.state.openDate}
    if (this.state.passphrase) {
      data.passphrase =  this.state.passphrase
    }
    this.props.createBox(data, () => this.props.fetchBoxes())
  }

  onBoxNameChange(event) {
    this.setState({ boxName: event.target.value })
  }

  onPassphraseChange(event) {
    this.setState({ passphrase: event.target.value })

  }

  onOpenDateChange(date){
    this.setState({ openDate: date })
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
          <TextField
            onChange={this.onBoxNameChange}
            type="text"
            className="form-control"
            label="Box name"
            value={this.state.boxName} />
          <TextField
            onChange={this.onPassphraseChange}
            type="password"
            className="form-control"
            label="Passphrase (optional)"
            value={this.state.passphrase} />
          <DateTimePicker
            style={{backgroundColor: "white"}}
            value={this.state.openDate}
            onChange={this.onOpenDateChange}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateBoxForm)
