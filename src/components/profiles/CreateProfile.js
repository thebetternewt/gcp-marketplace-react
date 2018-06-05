import React, { Component } from 'react';
import { Box } from '../UI';
import ContentContainer from '../common/ContentContainer';

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
    errors: {},
  };

  // Handle input value changes
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  render() {
    return (
      <ContentContainer>
        <Box>
          <h1>Create Your Profile</h1>
        </Box>
      </ContentContainer>
    );
  }
}

export default CreateProfile;
