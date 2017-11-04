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
    window.localStorage.removeItem('token')
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

export function getDate(date) {
  date = new Date(date)
  const month = String(date.getMonth()).length === 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = String(date.getDate()).length === 1 ? `0${date.getDate()}` : date.getDate()
  const hours = String(date.getHours()).length === 1 ? `0${date.getHours()}` : date.getHours()
  const minutes = String(date.getMinutes()).length === 1 ? `0${date.getMinutes()}` : date.getMinutes()
  const seconds = String(date.getSeconds()).length === 1 ? `0${date.getSeconds()}` : date.getSeconds()
  return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
