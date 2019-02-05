import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { DateTime } from 'luxon';
import { composeWithDevTools } from 'redux-devtools-extension';

import localStorageMiddleware from './middleware/localStorage';
import rootReducer from './reducers';
import rootSaga from './sagas';

import './index.css';

const init = () => {
  const initialState = {
    timer: {
      item: {
        id: 0,
        name: '',
        start: null,
        end: null,
        duration: null,
      },
      list: [],
    },
  };

  try {
    const item = JSON.parse(localStorage.getItem('item'));
    if (item) {
      const diffInMillis = DateTime.fromISO(item.start).diffNow('millisecond');
      initialState.timer.item = {
        id: item.id,
        name: localStorage.getItem('name') || '',
        start: item.start,
        duration: Math.abs(diffInMillis.valueOf()),
      };
    }

    const list = JSON.parse(localStorage.getItem('list')) || [];
    initialState.timer.list = list.map(el => ({
      id: el.id,
      name: el.name,
      start: el.start,
      end: el.end,
      duration: el.duration,
    }));

    return initialState;
  } catch (error) {
    // eslint-disable-next-line
    console.error('startup', error);
    return initialState;
  }
};

export default function initializeStore() {
  const sagaMiddleware = createSagaMiddleware();

  const preloadedState = init();

  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(localStorageMiddleware(), sagaMiddleware)
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
