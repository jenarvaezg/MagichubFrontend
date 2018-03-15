import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { GoogleLogin } from 'react-google-login';

import { logIn, logInWithGoogle } from './actions'
import { googleClientID } from '../../app.config';


class LoginForm extends Component {


  handleGoogleResponseOK(response) {
    this.props.logInWithGoogle(response, ({ data }) => {
      window.localStorage.token = data
      this.props.onLoginSuccessful()
    }, (error) => {
      this.props.onLoginFailed(error.response.data.error)
    })
  }

  handleGoogleResponseError(response) {
    let responseString = response.error;
    responseString = responseString.replace(new RegExp("_", 'g'), " ")
    responseString = responseString.charAt(0).toUpperCase() + responseString.slice(1);
    this.props.onLoginFailed(responseString)
  }

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      error={!!(touched && error)}
      label={touched && error ? `${label} - ${error}` : label}
      placeholder={label}
      {...input}
      {...custom}
    />
  )

  onSubmit(values){
    this.props.logIn(values, ({ data }) =>{
      window.localStorage.token = data
      this.props.onLoginSuccessful()
    }, (error) => {
      this.props.onLoginFailed(error.response.data.error)
    })
  }

  render(){
    const  { handleSubmit } = this.props;
    return(
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            margin="dense"
            name="username"
            label="Username"
            fullWidth={true}
            component={this.renderTextField}
          />
          <Field
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth={true}
            component={this.renderTextField}
          />
          <div className="row" style={{"textAlign": "center"}}>
            <Button type="submit" color="primary">Submit</Button>
          </div>
        </form>
        <div className="row" style={{"textAlign": "center"}}>
          <GoogleLogin
            clasName="google-login-button"
            clientId={googleClientID}
            buttonText="Login with Google"
            onSuccess={this.handleGoogleResponseOK.bind(this)}
            onFailure={this.handleGoogleResponseError.bind(this)}
          />
        </div>
      </div>
    )
  }
}

function validate(values){
  const errors = {}

  const requiredFields = [ 'username', 'password' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'LoginForm'
})(
  connect(null, { logIn, logInWithGoogle })(LoginForm)
);
