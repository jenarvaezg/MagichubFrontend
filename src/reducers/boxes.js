import { FETCH_BOXES } from '../components/BoxesPage/actions'

export default function(state = null, action) {
  switch(action.type){
  case FETCH_BOXES:
    return action.payload.data.results
  default:
    return state;
  }
}
