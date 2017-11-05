import _ from 'lodash';

import { FETCH_USERS } from '../components/BoxesPage/actions'

export default function(state = null, action) {
  switch(action.type){
  case FETCH_USERS:
    return _.mapKeys(action.payload.data.results, "id");
  default:
    return state;
  }
}
