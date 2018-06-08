import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Button } from '../UI';
import ContentContainer from '../common/ContentContainer';
import { createProfile } from '../../store/actions/profileActions';

class CreateProfile extends Component {
  state = {
    handle: '',
    bio: '',
    location: '',
    skills: '',
    website: '',
    github_username: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  // Handle input value changes
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handle form submit
  handleSubmit = e => {
    e.preventDefault();

    const profileData = {
      name: this.props.user.name,
      handle: this.state.handle,
      bio: this.state.bio
    };

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { handle, bio, errors } = this.state;

    return (
      <ContentContainer>
        <Box>
          <H1>Create Your Profile</H1>
          <form onSubmit={this.handleSubmit}>
            <Label htmlFor="handle">Handle:</Label>
            <Input
              type="text"
              name="handle"
              value={handle}
              onChange={this.handleChange}
            />
            {/* TODO: Make sure handle is unique */}
            {errors.handle && <ErrorMessage>{errors.handle[0]}</ErrorMessage>}

            <Label htmlFor="bio">Bio:</Label>
            <TextArea name="bio" value={bio} onChange={this.handleChange} />
            {errors.bio && <ErrorMessage>{errors.bio[0]}</ErrorMessage>}

            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </ContentContainer>
    );
  }
}

CreateProfile.propTypes = {
  user: PropTypes.shape().isRequired,
  createProfile: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));

const H1 = styled.h1`
  text-align: center;
`;

const Label = styled.label`
  display: block;
  color: #333;
  font-size: 1.2em;
  padding: 1rem 0 0.5rem;
`;

const Input = styled.input`
  display: block;
  border: none;
  outline: 2px solid #ddd;
  font-size: 1em;
  min-width: 50%;
  padding: 10px;
  margin-bottom: 1.5rem;
`;

const TextArea = styled.textarea`
  display: block;
  border: none;
  outline: 2px solid #ddd;
  font-size: 1em;
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: red;
  /* text-align: center; */
`;
