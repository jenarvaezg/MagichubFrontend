import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
//import createHistory from 'history/createHashHistory'

import '../style/App.css';
import BoxesPage from './BoxesPage';
import Loginpage from './LoginPage';
import { validTokenExists } from '../helpers';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    validTokenExists() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default () => {
    return(
      <HashRouter>
        <div>
          <Switch>
            <Route path="/login" component={Loginpage} />
            <PrivateRoute path="/" component={BoxesPage} />
          </Switch>
        </div>
      </HashRouter>

    )
  }
