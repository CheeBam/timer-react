import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { Router } from 'react-router';
import createHashHistory from 'history/createHashHistory';

import { DateTime } from 'luxon';
import { composeWithDevTools } from 'redux-devtools-extension';

import localStorageMiddleware from './middleware/localStorage';
import rootReducer  from './reducers';
import rootSaga  from './sagas';

import './index.css';
import App from './App';

const startup = () => {
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
        }
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
        initialState.timer.list = list.map(item => ({
            id: item.id,
            name: item.name,
            start: item.start,
            end: item.end,
            duration: item.duration,
        }));

        return initialState;
    } catch (error) {
        console.error('startup', error);
    }
};

const sagaMiddleware = createSagaMiddleware();

const preloadedState = startup();

const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(localStorageMiddleware(), sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL });

ReactDOM.render(
    <Provider store={ store }>
        <Router history={hashHistory}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
