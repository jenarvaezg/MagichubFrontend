import axios from 'axios';

import constants from '../../app.config'


export const LOGIN_PERFORMED = 'LOGIN_PERFORMED';
export const CREATED_ACCOUNT = 'CREATED_ACCOUNT';

export function logIn(credentials, sucessCallback, errorCallback) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  var params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', credentials.username);
  params.append('password', credentials.password);

  const request = axios.post(constants.loginUrl, params, {headers}).then(sucessCallback).catch(errorCallback);

  return {
    type: LOGIN_PERFORMED,
    payload: request
  }
}

export function logInWithGoogle(googleResponse, sucessCallback, errorCallback) {
  const headers = {
    'X-Google-Login': 'yes'
  }
  const request = axios.post(constants.loginUrl, googleResponse, { headers }).then(sucessCallback).catch(errorCallback)

  return {
    type: LOGIN_PERFORMED,
    payload: request
  }
}


export function createAccount(values, sucessCallback, errorCallback) {
  const url = `${constants.apiURL}/user`;
  const request = axios.post(url, values).then(sucessCallback).catch(errorCallback)

  return {
    type: CREATED_ACCOUNT,
    payload: request
  };
}
