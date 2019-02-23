import {combineReducers} from 'redux';
import {formReducer} from './form_reducer';
import {itemsReducer} from './items_reducer';

let rootReducer = combineReducers({
  form: formReducer,
  items: itemsReducer,
});

export default rootReducer;
