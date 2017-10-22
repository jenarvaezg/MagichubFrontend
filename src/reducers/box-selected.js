import { BOX_SELECTED, FETCH_BOXES } from '../actions'


function getBoxFromNewList(previousBox, boxList){
  for (var box of boxList) {
    if (previousBox.id === box.id) {
      return box
    }
  }

  return null
}

export default function(state = null, action) {
  switch(action.type){
  case BOX_SELECTED:
    return action.payload;
  case FETCH_BOXES:
    return state === null ? null : getBoxFromNewList(state, action.payload.data.results)
  default:
    return state;
  }
}
