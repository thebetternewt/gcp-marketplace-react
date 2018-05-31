import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Spinner from '../common/Spinner';

import { registerUser } from '../../store/actions/authActions';

class Auth extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Handle input value changes
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handle register form submission
  handleSubmit = e => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = this.state;
    const userData = {
      name,
      email,
      password,
      confirmPassword,
      photoUrl: 'https://avatars1.githubusercontent.com/u/8032577?s=460&v=4',
    };

    this.props.registerUser(userData);
  };

  render() {
    // Reroute if authenticated
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.redirectPath} />;
    }

    const { pathname } = this.props.location;
    let form;
    if (pathname === '/login') {
      form = (
        <LoginForm
          values={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.props.errors}
        />
      );
    } else {
      form = (
        <RegisterForm
          values={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.props.errors}
        />
      );
    }

    console.log(this.props);
    return <div>{this.props.loading ? <Spinner /> : form}</div>;
  }
}

Auth.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  registerUser: PropTypes.func.isRequired,
  redirectPath: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.token !== null,
  redirectPath: state.auth.authRedirectPath,
  errors: state.errors.errors,
});

export default connect(mapStateToProps, { registerUser })(Auth);
