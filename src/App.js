import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import HomePage from './components/homePage/HomePage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profiles/Profile';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/profiles" exact component={Profiles} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/signup" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
