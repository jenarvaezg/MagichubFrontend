import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

import { LoginPageContainer, LoginBox } from './styles'
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

  onLoginFailed(message) {
    this.setState({ showSnackbar: true, snackbarText: message });
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

  handleLoginSuccessful(){
    this.props.history.push("/")
  }


  render() {
    return(
      <LoginPageContainer>
        <LoginBox>
          <LoginForm
            onLoginFailed={this.onLoginFailed.bind(this)}
            onLoginSuccessful={this.handleLoginSuccessful.bind(this)} />
          <Button onClick={this.handleCreateAccountButtonClick.bind(this)}>Create account</Button>
        </LoginBox>
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
      </LoginPageContainer>
    )
  }
}


export default LoginPage;
