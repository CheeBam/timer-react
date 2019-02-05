import { all, fork } from 'redux-saga/effects';

import task from './task';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(task)]);
}
