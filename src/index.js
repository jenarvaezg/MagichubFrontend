import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import './axios.config'

import './style/index.css';
import App from './components/App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <MuiThemeProvider theme={createMuiTheme()}>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <App />
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('root'));
registerServiceWorker();
