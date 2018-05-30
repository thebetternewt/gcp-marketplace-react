import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ContentContainer from '../common/ContentContainer';

const AuthForm = props => (
  <ContentContainer>
    <Card>
      <h2>Sign Up</h2>
      <TextInput
        type="text"
        name="name"
        placeholder="name"
        onChange={props.handleChange}
      />
      <TextInput
        type="email"
        name="email"
        placeholder="email"
        onChange={props.handleChange}
      />
      <TextInput
        type="password"
        name="password"
        placeholder="password"
        onChange={props.handleChange}
      />
      <TextInput
        type="password"
        name="password_confirmation"
        placeholder="password again"
        onChange={props.handleChange}
      />
      <SubmitButton>Sign up</SubmitButton>
      <p>
        Already have an account?{' '}
        <Link to="">
          <span>Sign in</span>
        </Link>
      </p>
    </Card>
  </ContentContainer>
);

export default AuthForm;

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
  padding: 15px 0;
  margin: 15px auto 1rem;
  width: 100%;
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
