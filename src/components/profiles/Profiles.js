import React from 'react';
import styled from 'styled-components';

import ContentContainer from '../common/ContentContainer';
import ProfileItem from './ProfileItem';

import profiles from '../../data/profiles';

const SearchInput = styled.input`
  border: none;
  font-size: 1rem;

  height: 40px;
  margin: 1rem 0;
  padding: 5px 15px;
  width: 300px;
`;

const Profiles = () => {
  const profileItems = profiles.map(profile => (
    <ProfileItem key={profile.id} profile={profile} />
  ));
  return (
    <ContentContainer align="flex-start">
      <h1 style={{ paddingTop: '1em' }}>Browse Profiles</h1>
      <SearchInput type="text" placeholder="Type to start searching..." />
      {profileItems}
    </ContentContainer>
  );
};

export default Profiles;
