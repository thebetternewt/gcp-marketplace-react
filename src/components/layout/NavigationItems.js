import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import NavigationItem from './NavigationItem';

import userImage from '../../images/user.png';

const NavigationItems = props => (
  <Nav>
    <NavigationItem link="/profiles">Browse Profiles</NavigationItem>
    {props.isAuthenticated ? (
      <Fragment>
        <NavigationItem link="/dashboard">
          <ProfileLink>
            <img src={userImage} height="36" alt="" />
            <span>My Profile</span>
          </ProfileLink>
        </NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Fragment>
    ) : (
      <NavigationItem link="/login">Log In</NavigationItem>
    )}
  </Nav>
);

NavigationItems.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

export default withRouter(connect(mapStateToProps)(NavigationItems));

const Nav = styled.ul`
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
