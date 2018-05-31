import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ContentContainer from '../common/ContentContainer';
import { loginUser } from '../../store/actions/authActions';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  // Handle input value changes
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handle register form submission
  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const authData = {
      email,
      password,
    };

    this.props.loginUser(authData);
  };

  render() {
    // Reroute if authenticated
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.redirectPath} />;
    }

    return (
      <ContentContainer>
        <Card>
          <h2>Log In</h2>
          {this.props.errors && (
            <ErrorMessage>{this.props.errors[0].message}</ErrorMessage>
          )}
          <form onSubmit={this.handleSubmit}>
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
            <SubmitButton>Log in</SubmitButton>
          </form>
          <p>
            Don't have an account?{' '}
            <Link to="/signup">
              <span>Sign up!</span>
            </Link>
          </p>
        </Card>
      </ContentContainer>
    );
  }
}

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  redirectPath: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.token !== null,
  redirectPath: state.auth.authRedirectPath,
  errors: state.errors.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);

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
