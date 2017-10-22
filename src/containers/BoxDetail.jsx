import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GetNotesButton from './GetNotesButton';
import BoxRegisterButton from './BoxRegisterButton';
import InsertNotesForm from './InsertNotesForm';

class BoxDetail extends Component {

  getBoxRegisterButton(box){
    return (
      <span className="box-detail-register-button">
        <BoxRegisterButton />
      </span>
    )
  }

  getOpenBoxDiv(box){
    return (
      <div className="box-detail-open-status-open">
        <div className="box-detail-open-status-open-text">
          This box is open! It opened at { box.openDate }
        </div>
        <div>
          <GetNotesButton className="box-detail-get-notes" />
        </div>
      </div>
    );
  }

  getNotesUnavailableDiv() {
    return (
      <div className="box-detail-get-notes-unregistered">
        Notes will be available upon registering to the box
      </div>
    );
  }

  getClosedBoxDiv(box){
    return (
      <div className="box-detail-open-status-closed">
        <div className="box-detail-open-status-closed-text">
          This box is closed... It will open at { box.openDate }
        </div>
        <div>
          <InsertNotesForm />
        </div>
      </div>
    );
  }

  getNotesElement(box){
    if (!box.registered) {
      return this.getNotesUnavailableDiv();
    } else if(box.status === "open") {
      return this.getOpenBoxDiv(box);
    } else{
      return this.getClosedBoxDiv(box);
    }
  }

  render(){
    const box = this.props.box
    if (!box){
      return (
        <div className="hidden" />
      );
    }
    return (
      <div className="box-detail">
        <div className="box-detail-header">
          <h3>{box.name}</h3>
        </div>
        <div className="box-detail-register-status">
          <span
            className="box-detail-register-text">
            You are currently { box.registered ? "" : "not" } registered in this box.
          </span>
          { !box.registered ? this.getBoxRegisterButton(box) : null }
        </div>
        <div className="box-detail-notes-number">
          This box currently has: {box.numberOfNotes} note(s)
        </div>
        { this.getNotesElement(box) }
      </div>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  }, dispatch);
}

function mapStateToProps(state){
  return {
    box: state.selectedBox
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxDetail)
