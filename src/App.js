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
import ProfilePage from './components/profiles/ProfilePage';
import Dashboard from './components/profiles/Dashboard';
import CreateProfile from './components/profiles/CreateProfile';
import { setCurrentUser } from './store/actions/authActions';
import { firebase } from './firebase';

import './App.css';

class App extends Component {
  componentDidMount = () => {};

  render() {
    return (
      <div className="App">
        <Layout>
          <Route exact path="/" component={HomePage} />
          <Switch>
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={ProfilePage} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
          </Switch>
        </Layout>
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.user !== null
});

export default withRouter(
  connect(
    mapStateToProps,
    { setCurrentUser }
  )(App)
);
