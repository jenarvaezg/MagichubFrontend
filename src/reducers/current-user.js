import { LOGIN_PERFORMED } from '../components/LoginPage/actions'
import { userFromToken } from '../helpers'

export default function(state = null, action) {
  switch(action.type){
  case LOGIN_PERFORMED:
    return userFromToken() || state;
  default:
    return state;
  }
}
