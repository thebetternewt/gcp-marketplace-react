import React from 'react';
import styled from 'styled-components';

import NavigationItem from './NavigationItem';

import userImage from '../../images/user.png';

const NavigationItems = () => (
  <LinkList>
    <NavigationItem link="/profiles">Browse Profiles</NavigationItem>
    <NavigationItem link="/profile/1">
      <ProfileLink>
        <img src={userImage} height="36" alt="" />
        <span>My Profile</span>
      </ProfileLink>
    </NavigationItem>
  </LinkList>
);

export default NavigationItems;

const LinkList = styled.ul`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: 800px) {
    align-items: center;
    flex-direction: row;
    height: 100%;
  }
`;

const ProfileLink = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 6px;
  }
`;
