import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Ionicon from 'react-ionicons'

import { boxSelected } from '../actions';
import { iconStyle } from '../style';

class CreateBoxListItem extends Component {

  getClassName(){
    let base = 'list-group-item box-list-item'
    return this.props.selectedBox === null ? `${base} selected-box` : base
  }


  render(){
    return(
      <li className={this.getClassName()} onClick={() => this.props.boxSelected(null)}>
        <Ionicon style={iconStyle} icon="ion-plus-circled" />
        <span>Create Box</span>
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedBox: state.selectedBox
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ boxSelected }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBoxListItem)
