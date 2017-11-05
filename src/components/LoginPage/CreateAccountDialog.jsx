import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

import { createAccount } from './actions';

class CreateAccountDialog extends React.Component {
  handleRequestClose(){
    this.props.onClose()
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
    this.props.createAccount(values, () => {
      this.props.onCreatedAccountSuccess();
      this.handleRequestClose()
    }, (error) => {
      this.props.onCreatedAccountError(error);
    });
  }


  render() {
    const  { handleSubmit } = this.props;
    return (
      <div>
        <Dialog open={this.props.open} onRequestClose={this.handleRequestClose.bind(this)}>
          <DialogTitle>Create an account</DialogTitle>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <DialogContent>
              <Field
                autoFocus
                margin="dense"
                name="username"
                label="Username"
                type="text"
                fullWidth
                component={this.renderTextField}
              />
              <Field
                margin="dense"
                name="firstName"
                label="First name"
                type="text"
                fullWidth
                component={this.renderTextField}
              />
              <Field
                margin="dense"
                name="lastName"
                label="Last name"
                type="text"
                fullWidth
                component={this.renderTextField}
              />
              <Field
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                component={this.renderTextField}
              />
              <Field
                margin="dense"
                name="password"
                label="Pasword"
                type="password"
                fullWidth
                component={this.renderTextField}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleRequestClose.bind(this)} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

function validate(values){
  const errors = {}

  const requiredFields = [ 'username', 'password', 'firstName', 'email']
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'CreateAccountForm'
})(
  connect(null, { createAccount })(CreateAccountDialog)
);
