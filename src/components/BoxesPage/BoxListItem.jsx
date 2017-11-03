import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Ionicon from 'react-ionicons'

import { boxSelected } from './actions';
import { iconStyle } from '../../style';


class BoxListItem extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this)
  }


  onClick(event) {
    event.preventDefault();

    this.props.boxSelected(this.props.box);
  }

  getClassName(){
    let base = 'list-group-item box-list-item'
    return this.props.selectedBox === this.props.box ? `${base} selected-box` : base
  }

  render() {
    return (
      <li className={this.getClassName()} onClick={this.onClick} >
        <span className="box-list-item-name text-right">{this.props.box.name}</span>
        <Ionicon style={iconStyle} icon={this.props.box.registered ? "ion-android-unlock" : "ion-android-lock"}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(BoxListItem);
