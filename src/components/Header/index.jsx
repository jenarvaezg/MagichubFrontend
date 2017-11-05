import React, { Component } from 'react';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
});

class Header extends Component {

  handleLogout(){
    window.localStorage.removeItem('token')
    window.location = process.env.PUBLIC_URL + '/login'
  }

  render(){
    return(
      <header>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit">
              MagicBox
            </Typography>
            <Button
              style={{bottom: 0, margin: 0, position: "absolute", left: "initial", top: 0, right: 0}}
              color="contrast"
              onClick={this.handleLogout.bind(this)}>
              Log out
            </Button>
          </Toolbar>
        </AppBar>
      </header>
    )
  }
}

export default withStyles(styles)(Header);
