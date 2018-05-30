import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import ContentContainer from './components/common/ContentContainer';
import HomePage from './components/homePage/HomePage';
import Auth from './components/auth/Auth';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profiles/Profile';

import './App.css';

class App extends Component {
  state = {
    auth: false,
  };

  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/profiles" exact component={Profiles} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/signup" component={Auth} />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
