import jwt_decode from 'jwt-decode';

export function validTokenExists() {
  let jwt = window.localStorage.token
  if (!jwt) {
    return false
  }
  try {
    const decoded = jwt_decode(jwt)
    const expired = new Date() > new Date(decoded.exp*1000)
    if (expired) {
      window.localStorage.removeItem('token')
    }
    return !expired
  } catch(error) {
    window.localstorate.removeItem('token')
    return false
  }
}


export function userFromToken() {
  let jwt = window.localStorage.token
  if (!jwt) {
    return null
  }
  try {
    const decoded = jwt_decode(jwt)
    return decoded.user
  } catch(error) {
    window.localstorate.removeItem('token')
    return null
  }
}
