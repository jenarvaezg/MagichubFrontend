import axios from 'axios'

import constants from './app.config'
import { validTokenExists } from './helpers'

function creatingUser(request) {
  return request.url === `${constants.apiURL}/user` && request.method === "post"
}

axios.interceptors.request.use(request => {
  if (!validTokenExists() && (request.url !== constants.loginUrl && !creatingUser(request))) {
    window.location = '/login';
  }
  if (window.localStorage.token) {
    request.headers['Authorization'] = `Bearer ${window.localStorage.token}`;
  }
  if (request.url !== constants.loginUrl) {
    request.headers['Content-Type'] = "application/json";
  }
  return request
})
