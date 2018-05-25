import React from 'react';

import ProfileItem from './ProfileItem';

import profiles from '../../data/profiles';

console.log(profiles);

const Profiles = () => {
  const profileItems = profiles.map(profile => (
    <ProfileItem key={profile.id} profile={profile} />
  ));
  return <div>{profileItems}</div>;
};

export default Profiles;
