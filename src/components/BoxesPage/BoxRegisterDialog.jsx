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

import { boxRegister } from './actions';

class BoxRegisterDialog extends React.Component {
  handleRequestClose(){
    this.props.onClose()
  }

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      error={!!(touched && error)}
      label={touched && error ? error : label}
      placeholder={label}
      {...input}
      {...custom}
    />
  )

  onSubmit(values){
    this.props.boxRegister(this.props.box, values, () => {
      this.props.onRegisterSuccess();
      this.handleRequestClose()
    }, (error) => {
      this.props.onRegisterError(error);
    });
  }


  render() {
    const  { handleSubmit } = this.props;
    return (
      <div>
        <Dialog open={this.props.open} onRequestClose={this.handleRequestClose.bind(this)}>
          <DialogTitle>Register into box</DialogTitle>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <DialogContent>
              <Field
                autoFocus
                margin="dense"
                name="passphrase"
                label="Passphrase"
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

  const requiredFields = [ 'passphrase' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })

  return errors
}

function mapStateToProps(state){
  return {
    box: state.selectedBox
  }
}

export default reduxForm({
  validate,
  form: 'RegisterInBoxForm'
})(
  connect(mapStateToProps, { boxRegister })(BoxRegisterDialog)
);
