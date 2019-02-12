import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducer';
import AppContainer from './App';
import * as serviceWorker from './serviceWorker';
/* eslint-disable react/jsx-filename-extension, no-undef */

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(thunk))}>
    <BrowserRouter>
      <Route path="/" component={AppContainer} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
