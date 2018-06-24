import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
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
import { setCurrentUser, logoutUser } from './store/actions/authActions';
import { firebase } from './firebase';

import './App.css';
import DeleteAccount from './components/profiles/DeleteAccount';

class App extends Component {
  componentDidMount = () => {
    const { history } = this.props;

    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        // Set current user if user logged in
        this.props.setCurrentUser(user);
      } else {
        // Logout user
        this.props.logoutUser();
        if (history.location.pathname !== '/') {
          history.push('/');
        }
      }
    });
  };

  render() {
    return (
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home | The Marketplace</title>
          <meta
            name="description"
            content="A social network where Christian creatives can connect."
          />
        </Helmet>
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
          <Switch>
            <PrivateRoute
              exact
              path="/delete-account"
              component={DeleteAccount}
            />
          </Switch>
        </Layout>
      </div>
    );
  }
}

App.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired
};

export default withRouter(
  connect(
    null,
    { setCurrentUser, logoutUser }
  )(App)
);
