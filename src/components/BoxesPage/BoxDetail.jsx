import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'material-ui/Snackbar';

import { getDate } from '../../helpers';
import { boxRegister, fetchBoxes, fetchNotes } from './actions'
import BoxRegisterDialog from './BoxRegisterDialog'
import InsertNotesForm from './InsertNotesForm';
import NotesListDialog from './NotesListDialog';

class BoxDetail extends Component {

  constructor(props){
    super(props);

    this.state = {
      showBoxRegisterDialog: false,
      showNotesListDialog: false,
      showSnackbar: false,
    }
  }

  handleCloseBoxRegisterDialog() {
    this.setState({showBoxRegisterDialog: false})
  }

  getBoxRegisterButton(box){
    return (
      <span className="box-detail-register-button">
        <button
          onClick={this.handleRegisterAttempt.bind(this)}
          className="box-register-button">Register into box</button>
      </span>
    )
  }

  getOpenBoxDiv(box){
    return (
      <div className="box-detail-open-status-open">
        <div className="box-detail-open-status-open-text">
          This box is open! It opened at { getDate(box.openDate) }
        </div>
        <div>
          <button
            onClick={this.handleOpenBox.bind(this)}
            className="get-notes-button">
            Get notes for the current box
          </button>
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
          This box is closed... It will open at { getDate(box.openDate) }
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

  handleOpenBox() {
    this.props.fetchNotes(this.props.box, () => this.setState({showNotesListDialog: true}));
  }

  handleCloseNotesListDialog(){
    this.setState({showNotesListDialog: false})
  }

  handleRegisterAttempt() {
    const { box } = this.props;
    if ( !box.hasPassphrase ) {
      this.props.boxRegister(this.props.box, {}, () => this.handleBoxRegisterSuccess());
    } else {
      this.setState({showBoxRegisterDialog: true})
    }
  }

  handleBoxRegisterSuccess() {
    this.setState({
      showBoxRegisterDialog: false,
      showSnackbar: true,
      snackbarText: `Registered in box ${this.props.box.name} succesfully`})
    this.props.fetchBoxes()
  }

  handleBoxRegisterError(error) {
    error = error.response.data.error;
    this.setState({ showSnackbar: true, snackbarText: error});
  }

  handleRequestClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ showSnackbar: false });
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
        <BoxRegisterDialog
          open={this.state.showBoxRegisterDialog}
          onClose={this.handleCloseBoxRegisterDialog.bind(this)}
          onRegisterSuccess={this.handleBoxRegisterSuccess.bind(this)}
          onRegisterError={this.handleBoxRegisterError.bind(this)} />
        <NotesListDialog
          open={this.state.showNotesListDialog}
          onRequestClose={this.handleCloseNotesListDialog.bind(this)}
          notes={this.props.notes} />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.showSnackbar}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose.bind(this)}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarText}</span>}
        />
      </div>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ boxRegister, fetchBoxes, fetchNotes }, dispatch);
}

function mapStateToProps(state){
  return {
    box: state.selectedBox
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxDetail)
