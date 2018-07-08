import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import validate from 'validate.js';

import {
  Box,
  Button,
  Label,
  Input,
  TextArea,
  ErrorMessage,
  InputCounter,
  InputInfo
} from '../UI';
import ContentContainer from '../common/ContentContainer';
import { updateProfile } from '../../store/actions/profileActions';
import { clearErrors } from '../../store/actions/errorActions';

class EditProfile extends Component {
  state = {
    handle: this.props.profile.handle,
    bio: this.props.profile.bio,
    location: this.props.profile.location,
    skills: this.props.profile.skills,
    website: this.props.profile.website,
    twitter: this.props.profile.twitter,
    facebook: this.props.profile.facebook,
    linkedin: this.props.profile.linkedin,
    youtube: this.props.profile.youtube,
    instagram: this.props.profile.instagram,
    errors: this.props.errors
  };

  static getDerivedStateFromProps = nextProps => {
    // Return state object
    return {
      errors: nextProps.errors
    };
  };

  componentWillUnmount = () => {
    this.props.clearErrors();
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
      skills: this.state.skills,
      location: this.state.location,
      website: this.state.website,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.updateProfile(profileData, this.props.history);
  };

  render() {
    const {
      handle,
      bio,
      skills,
      errors,
      location,
      website,
      twitter,
      facebook,
      instagram,
      youtube,
      linkedin
    } = this.state;

    const socialInputs = (
      <div>
        <Label htmlFor="twitter">Twitter URL:</Label>
        <Input
          type="text"
          name="twitter"
          value={twitter}
          onChange={this.handleChange}
        />
        {errors.twitter && <ErrorMessage>{errors.twitter[0]}</ErrorMessage>}

        <Label htmlFor="facebook">Facebook URL:</Label>
        <Input
          type="text"
          name="facebook"
          value={facebook}
          onChange={this.handleChange}
        />
        {errors.facebook && <ErrorMessage>{errors.facebook[0]}</ErrorMessage>}

        <Label htmlFor="instagram">Instagram URL:</Label>
        <Input
          type="text"
          name="instagram"
          value={instagram}
          onChange={this.handleChange}
        />
        {errors.instagram && <ErrorMessage>{errors.instagram[0]}</ErrorMessage>}

        <Label htmlFor="youtube">Youtube URL:</Label>
        <Input
          type="text"
          name="youtube"
          value={youtube}
          onChange={this.handleChange}
        />
        {errors.youtube && <ErrorMessage>{errors.youtube[0]}</ErrorMessage>}

        <Label htmlFor="linkedin">LinkedIn URL:</Label>
        <Input
          type="text"
          name="linkedin"
          value={linkedin}
          onChange={this.handleChange}
        />
        {errors.linkedin && <ErrorMessage>{errors.linkedin[0]}</ErrorMessage>}
      </div>
    );

    return (
      <ContentContainer>
        <Box>
          <H1>Edit Your Profile</H1>
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
            <InputCounter data={bio} maxLength={300} />
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

            <Label htmlFor="skills">Location:</Label>
            <Input
              type="text"
              name="location"
              value={location}
              onChange={this.handleChange}
            />
            <InputInfo>Ex: "Denver, CO"</InputInfo>
            {errors.location && (
              <ErrorMessage>{errors.location[0]}</ErrorMessage>
            )}

            <Label htmlFor="website">Website:</Label>
            <Input
              type="text"
              name="website"
              value={website}
              onChange={this.handleChange}
            />
            {errors.website && <ErrorMessage>{errors.website[0]}</ErrorMessage>}

            <h4>Social Links</h4>
            {socialInputs}
          </ProfileForm>
          <Button onClick={this.handleSubmit}>Submit</Button>
          {!validate.isEmpty(errors) && (
            <ErrorMessage>Something went wrong.</ErrorMessage>
          )}
        </Box>
      </ContentContainer>
    );
  }
}

EditProfile.propTypes = {
  user: PropTypes.shape().isRequired,
  profile: PropTypes.shape().isRequired,
  updateProfile: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  errors: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateProfile, clearErrors }
)(withRouter(EditProfile));

const H1 = styled.h1`
  text-align: center;
`;

// const Label = styled.label`
//   display: block;
//   color: #333;
//   font-size: 1.2em;
//   padding: 1rem 0 0.5rem;
// `;

// const Input = styled.input`
//   display: block;
//   border: none;
//   outline: 2px solid #ddd;
//   font-size: 1em;
//   max-width: 400px;
//   width: 100%;
//   padding: 10px;
// `;
// const InputCounter = styled.p`
//   color: ${props => (props.data.length > props.maxLength ? 'red' : ' #444')};
// `;

// const InputInfo = styled.p`
//   font-size: 0.8em;
//   opacity: 0.6;
// `;

// const TextArea = styled.textarea`
//   display: block;
//   border: none;
//   outline: 2px solid #ddd;
//   font-size: 1em;
//   min-width: 100%;
//   height: 100px;
//   padding: 10px;
// `;

// const ErrorMessage = styled.p`
//   color: red;
// `;

const ProfileForm = styled.form`
  margin: 1rem 0 2rem;
`;
