import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import boxReducer from './boxes';
import selectedBoxReducer from './box-selected';
import notesReducer from './notes';
import currentUserReducer from './current-user';
import usersReducer from './users'

const rootReducer = combineReducers({
  boxes: boxReducer,
  selectedBox: selectedBoxReducer,
  notes: notesReducer,
  currentUser: currentUserReducer,
  users: usersReducer,
  form: formReducer
});

export default rootReducer;
