import { combineReducers } from 'redux';

import timer from './timerReducer';
import task from './taskReducer';

const rootReducer = combineReducers({
  timer,
  task,
});

export default rootReducer;
