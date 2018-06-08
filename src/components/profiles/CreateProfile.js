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
      bio: this.state.bio,
      skills: this.state.skills
    };

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { handle, bio, skills, errors } = this.state;

    return (
      <ContentContainer>
        <Box>
          <H1>Create Your Profile</H1>
          <ProfileForm>
            <Label htmlFor="handle">Handle:</Label>
            <Input
              type="text"
              name="handle"
              value={handle}
              onChange={this.handleChange}
            />
            {errors.handle && <ErrorMessage>{errors.handle[0]}</ErrorMessage>}

            <Label htmlFor="bio">Bio:</Label>
            <TextArea name="bio" value={bio} onChange={this.handleChange} />
            {errors.bio && <ErrorMessage>{errors.bio[0]}</ErrorMessage>}

            <Label htmlFor="skills">Skills:</Label>
            <Input
              type="text"
              name="skills"
              value={skills}
              onChange={this.handleChange}
            />
            <InputInfo>Enter your skills separated by commas.</InputInfo>
            {errors.skills && <ErrorMessage>{errors.skills[0]}</ErrorMessage>}
          </ProfileForm>
          <Button onClick={this.handleSubmit}>Submit</Button>
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
`;

const InputInfo = styled.p`
  font-size: 0.8em;
  opacity: 0.6;
`;

const TextArea = styled.textarea`
  display: block;
  border: none;
  outline: 2px solid #ddd;
  font-size: 1em;
  min-width: 50%;
  height: 100px;
  padding: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  /* text-align: center; */
`;

const ProfileForm = styled.form`
  margin: 1rem 0 2rem;
`;
