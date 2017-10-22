import { FETCH_NOTES, BOX_SELECTED } from '../actions'

export default function(state = null, action) {
  switch(action.type){
  case FETCH_NOTES:
    return action.payload;
  case BOX_SELECTED:
    return null;
  default:
    return state;
  }
}
