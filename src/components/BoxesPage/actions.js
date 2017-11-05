import axios from 'axios';

import constants from '../../app.config'

const API_URL=constants.apiURL

export const FETCH_BOXES = 'FETCH_BOXES';
export const FETCH_NOTES = 'FETCH_NOTES';
export const BOX_SELECTED = 'BOX_SELECTED';
export const BOX_REGISTER = 'BOX_REGISTER';
export const BOX_CREATED = 'BOX_CREATED';

export function fetchBoxes() {
  const url = `${API_URL}/box`;
  const request = axios.get(url);

  return {
    type: FETCH_BOXES,
    payload: request
  };
}

export function fetchNotes(box, callback) {
  const url = `${API_URL}/box/${box.id}/notes`

  const request = axios.get(url);

  if (callback){
    request.then(callback)
  }

  return {
    type: FETCH_NOTES,
    payload: request
  }
}

export function boxRegister(box, data, callback, errorCallback) {
  const url = `${API_URL}/box/${box.id}/register`
  const request = axios.post(url, data).then(callback).catch(errorCallback);

  return {
    type: BOX_REGISTER,
    payload: request
  }
}

export function createBox(data, callback) {
  const url = `${API_URL}/box`

  const request = axios.post(url, data).then(callback);

  return {
    type: BOX_CREATED,
    payload: request
  }
}

export function insertNote(box, data, callback) {
  const url = `${API_URL}/box/${box.id}/notes`

  const request = axios.post(url, data);

  if (callback) {
    request.then(callback)
  }

  return {
    type: BOX_CREATED,
    payload: request
  }
}


export function boxSelected(box) {
  return {
    type: BOX_SELECTED,
    payload: box
  };
}
