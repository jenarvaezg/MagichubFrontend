import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

import { validTokenExists } from '../../helpers';
import LoginForm from './LoginForm';
import CreateAccountDialog from './CreateAccountDialog';

class LoginPage extends Component {

  constructor(props) {
    super(props)

    if (validTokenExists()) {
      props.history.push('/')
    }
    this.state = {
      showSnackbar: false,
      showCreateAccountModal: false,
      snackbarText: ''
    }
  }

  onLoginFailed() {
    this.setState({ showSnackbar: true, snackbarText: 'Login failed, invalid credentials' });
  }

  handleRequestClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ showSnackbar: false });
  }


  handleCreateAccountButtonClick() {
    this.setState({ showCreateAccountModal: true });
  };

  handleCloseCreateAccountModal() {
    this.setState({ showCreateAccountModal: false });
  };

  handleCreateAccountSuccess() {
    this.setState({ showSnackbar: true, snackbarText: 'Account created succesfully'})
  }

  handleCreateAccountError(error) {
    error = error.response.data.error;
    this.setState({ showSnackbar: true, snackbarText: error});
  }


  render() {
    return(
      <div className="container-fluid login-page" style={{width: "100%", height: "100%"}}>
        <div className="row">
          <div className="col-md-4 col-md-offset-4" style={{padding: "200px", textAlign: "center"}}>
            <LoginForm onLoginFailed={this.onLoginFailed.bind(this)}/>
            <Button onClick={this.handleCreateAccountButtonClick.bind(this)}>Create account</Button>
          </div>
        </div>
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
        <CreateAccountDialog
          open={this.state.showCreateAccountModal}
          onClose={this.handleCloseCreateAccountModal.bind(this)}
          onCreatedAccountSuccess={this.handleCreateAccountSuccess.bind(this)}
          onCreatedAccountError={this.handleCreateAccountError.bind(this)}
        />
      </div>
    )
  }
}


export default LoginPage;
