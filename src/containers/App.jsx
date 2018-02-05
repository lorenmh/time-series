import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';

import rootSaga from '../sagas';
import rootReducer from '../reducers';
import { action, INITIALIZE } from '../actions';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {channels: []},
  compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(logger),
  )
);

sagaMiddleware.run(rootSaga);

export default class App extends Component {
  componentDidMount() {
    const { dispatch } = store;
    dispatch(action(INITIALIZE));
  }

  render() {
    return (
      <Provider store={store}>
        <h1>Hello</h1>
      </Provider>
    )
  }
}
