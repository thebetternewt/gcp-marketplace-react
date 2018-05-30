import React, { Component } from 'react';
import AuthForm from './AuthForm';

class Auth extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  // Handle input value changes
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return <AuthForm handleChange={this.handleChange} />;
  }
}

export default Auth;
