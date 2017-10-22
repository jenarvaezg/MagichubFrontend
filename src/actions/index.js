import axios from 'axios';

const ROOT_URL='http://jenarvaezgmagicbox.ddns.net:8000';
const API_URL=`${ROOT_URL}/api/v1`

export const FETCH_BOXES = 'FETCH_BOXES';
export const FETCH_NOTES = 'FETCH_NOTES';
export const BOX_SELECTED = 'BOX_SELECTED';
export const BOX_REGISTER = 'BOX_REGISTER';
export const BOX_CREATED = 'BOX_CREATED';

function getAccessToken(){
  return 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZWxiYXJ0byIsImVtYWlsIjoiYmFydG9sb21ld0BzaW1wc29ucy5jb20iLCJmaXJzdE5hbWUiOiJlbCIsImxhc3ROYW1lIjoiYmFydG8iLCJzdGF0dXMiOiJBQ1RJVkUiLCJpZCI6IjU5ZWJhNzRkMDU5ZDVkMDAwMTAzZTAzZCJ9LCJleHAiOjE1MDg5Mjk5MDYsImlhdCI6MTUwODY3MDcwNiwiaXNzIjoibWFnaWNib3guYXVoIiwic3ViIjoiZWxiYXJ0byJ9.0fwy3LBeiImLQWDB0UNUvkFlnZ6yewge36NWp3hG0NgusinMvpmIVvhuAA89uk37A9r-OKwp3uArj8NjeezRew';
}

export function fetchBoxes() {
  const url = `${API_URL}/box`;
  const request = axios.get(url, {headers: {Authorization: getAccessToken()}});

  return {
    type: FETCH_BOXES,
    payload: request
  };
}

export function fetchNotes(box) {
  const url = `${API_URL}/box/${box.id}/notes`
  const headers = {
    Authorization: getAccessToken(),
  }

  const request = axios.get(url, {headers});

  return {
    type: FETCH_NOTES,
    payload: request
  }
}

export function boxRegister(box) {
  const url = `${API_URL}/box/${box.id}/register`
  const headers = {
    Authorization: getAccessToken(),
    'Content-Type': 'application/json'
  }

  const data = {
    passphrase: ''
  }

  const request = axios.post(url, data, {headers});

  return {
    type: BOX_REGISTER,
    payload: request
  }
}

export function createBox(data) {
  const url = `${API_URL}/box`
  const headers = {
    Authorization: getAccessToken(),
    'Content-Type': 'application/json'
  }


  const request = axios.post(url, data, {headers});

  return {
    type: BOX_CREATED,
    payload: request
  }
}

export function insertNote(box, data) {
  const url = `${API_URL}/box/${box.id}/notes`
  const headers = {
    Authorization: getAccessToken(),
    'Content-Type': 'application/json'
  }


  const request = axios.post(url, data, {headers});

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
