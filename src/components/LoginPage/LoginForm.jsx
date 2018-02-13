import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { logIn } from './actions'


class LoginForm extends Component {
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
      this.props.onLoginFailed()
    })
  }

  render(){
    const  { handleSubmit } = this.props;
    return(
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
  connect(null, { logIn })(LoginForm)
);
