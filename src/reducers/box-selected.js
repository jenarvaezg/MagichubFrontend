import { BOX_SELECTED, FETCH_BOXES } from '../components/BoxesPage/actions'


function getBoxFromNewList(previousBox, boxList){
  return boxList.find(box => box.id === previousBox.id)
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
