import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { boxRegister } from './actions'


class BoxRegisterButton extends Component {

  constructor(props){
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();

    this.props.boxRegister(this.props.box);
  }

  render() {
    return <button onClick={this.onClick} className="box-register-button">Register into box</button>
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ boxRegister }, dispatch);
}

function mapStateToProps(state){
  return {
    box: state.selectedBox
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxRegisterButton)
