import { combineReducers } from 'redux';
import alert from './alert';
import todo from './todo';

export default combineReducers({
  alert,
  todo
});
