import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import store from './store/store';

import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { firebase } from './firebase';
import { setCurrentUser, logoutUser } from './store/actions/authActions';

const history = createHistory();

const app = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

let isRendered = false;
const renderApp = () => {
  if (!isRendered) {
    ReactDOM.render(app, document.getElementById('root'));
    registerServiceWorker();
    isRendered = true;
  }
};

firebase.auth.onAuthStateChanged(user => {
  if (user) {
    console.log('login user id: ', user.uid);
    console.log('name: ', user.displayName);
    store.dispatch(setCurrentUser(user));
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    } else {
      console.log('logout');
      store.dispatch(logoutUser());
      renderApp();
      history.push('/');
    }
  }
});
