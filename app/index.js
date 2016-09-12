import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { match, Router, browserHistory } from 'react-router';
import configureStore from './redux/store/configureStore';
import routes from './routes';

if (__CLIENT__ && __DEVELOPMENT__) {
  // https://facebook.github.io/react/docs/advanced-performance.html
  window.Perf = require('react-addons-perf');
}

let initialState;
try {
  initialState = window.__INITIAL_STATE__; // for erver-side-rendering
} catch (err) {
  initialState = {};
}

export const history = browserHistory;

export const store = configureStore(initialState);

if (__CLIENT__) {
  match({history, routes}, (err, redirect, renderProps) => {
    ReactDOM.render(
      <Provider store={store} key="provider">
        <Router {...renderProps} />
      </Provider>,
      document.getElementById('root')
    );
  });
}
