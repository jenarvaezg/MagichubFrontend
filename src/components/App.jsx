import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

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
      <BrowserRouter>
        <div>
          <Switch>
            <Route path={process.env.PUBLIC_URL + '/login'} component={Loginpage} />
            <PrivateRoute path={process.env.PUBLIC_URL + '/'} component={BoxesPage} />
          </Switch>
        </div>
      </BrowserRouter>

    )
  }
