import { combineReducers } from 'redux';

import boxReducer from './boxes';
import selectedBoxReducer from './box-selected';
import notesReducer from './notes';


const rootReducer = combineReducers({
  boxes: boxReducer,
  selectedBox: selectedBoxReducer,
  notes: notesReducer
});

export default rootReducer;
