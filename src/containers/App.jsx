import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers';
import { initialAction } from '../actions';

const store = createStore(rootReducer, {});

export default class App extends Component {
  componentDidMount() {
    const { dispatch } = store;
    dispatch(initialAction());
  }

  render() {
    return (
      <Provider store={store}>
        <h1>Hello</h1>
      </Provider>
    )
  }
}
