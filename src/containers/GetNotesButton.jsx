import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchNotes } from '../actions'


class GetNotesButton extends Component {

  constructor(props){
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();

    this.props.fetchNotes(this.props.box);
  }

  render() {
    return <button onClick={this.onClick} className="get-notes-button">Get notes for the current box</button>
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchNotes }, dispatch);
}

function mapStateToProps(state){
  return {
    box: state.selectedBox
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetNotesButton)
