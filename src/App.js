import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PrivateRoute from './components/common/PrivateRoute';

import Layout from './components/layout/Layout';
import HomePage from './components/homePage/HomePage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profiles/Profile';
import Dashboard from './components/profiles/Dashboard';
import { checkAuthState as tryAutoLogin } from './store/actions/authActions';

import './App.css';

class App extends Component {
  componentDidMount = () => {
    this.props.tryAutoLogin();
  };

  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/profiles" exact component={Profiles} />
            <Route path="/profile/:id" component={Profile} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route path="/signup" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

App.propTypes = {
  tryAutoLogin: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { tryAutoLogin })(App));
