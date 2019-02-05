/**
 * @module Sagas/Task
 * @desc Task
 */

import { all, call, put, takeLatest, select } from 'redux-saga/effects';

import { GET_TASK, GET_TASK_SUCCESS, GET_TASK_FAILED } from '../actions/task';

const delay = ms => new Promise(res => setTimeout(res, ms));

const getList = state => state.timer.list;
/**
 * getTask
 */
export function* getTask(data) {
  try {
    yield call(delay, 1000);
    const list = yield select(getList);

    const task = list.find(item => item.id === +data.payload);

    if (task) {
      yield put({
        type: GET_TASK_SUCCESS,
        payload: task,
      });
    } else {
      throw new Error('404');
    }
  } catch (err) {
    yield put({
      type: GET_TASK_FAILED,
      payload: err,
    });
  }
}

/**
 * Task Sagas
 */
export default function* root() {
  yield all([takeLatest(GET_TASK, getTask)]);
}
