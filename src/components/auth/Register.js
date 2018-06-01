import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ContentContainer from '../common/ContentContainer';
import Spinner from '../common/Spinner';

import { registerUser } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Clear errors when unmounting
  componentWillUnmount = () => {
    this.props.clearErrors();
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

    if (this.props.loading) {
      return <Spinner />;
    }

    return (
      <ContentContainer>
        <Card>
          <h2>Sign Up</h2>
          {this.props.errors && (
            <ErrorMessage>{this.props.errors[0].message}</ErrorMessage>
          )}
          <form onSubmit={this.handleSubmit}>
            <TextInput
              type="text"
              name="name"
              placeholder="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
            <TextInput
              type="email"
              name="email"
              placeholder="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <TextInput
              type="password"
              name="password"
              placeholder="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <TextInput
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
            />
            <SubmitButton>Sign up</SubmitButton>
          </form>
          <p>
            Already have an account?{' '}
            <Link to="/login">
              <span>Log in</span>
            </Link>
          </p>
        </Card>
      </ContentContainer>
    );
  }
}

const TextInput = styled.input`
  display: block;
  width: 100%;
  max-width: 90vw;
  border: none;
  border-radius: 99px;
  font-size: 1rem;

  margin: 10px auto;
  padding: 10px 15px;
`;

const SubmitButton = styled.button`
  display: block;
  background-color: #3d9991;
  color: #fff;
  border: none;
  border-radius: 99px;
  font-size: 1.2rem;
  padding: 10px 0;
  margin: 15px auto 1rem;
  width: 100%;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const Card = styled.div`
  align-self: center;
  width: 300px;
  max-width: 90%;
  background-color: #e1eaf2;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  margin: 20% auto;
  padding: 15px;

  h2 {
    font-family: 'Montserrat', 'Helvetica', Arial, sans-serif;
    margin: 0.9em 0 0.9em;
    text-align: center;
    text-transform: uppercase;
  }

  span {
    color: #43a7ff;
    text-decoration: underline;
  }
`;

Register.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  registerUser: PropTypes.func.isRequired,
  redirectPath: PropTypes.string.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.token !== null,
  redirectPath: state.auth.authRedirectPath,
  errors: state.errors.errors,
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
  Register
);
