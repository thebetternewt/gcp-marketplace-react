import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../../images/logos/gcp-logo-white.png';
import userImage from '../../images/user.png';

const Header = styled.div`
  background-color: #333;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.5);
  display: flex;
  height: 60px;
  justify-content: center;
  left: 0;
  max-width: 100vw;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const Container = styled.div`
  align-items: center;
  color: #fff;
  display: flex;

  height: 100%;
  justify-content: space-between;
  max-width: 1200px;
  padding: 0 15px;
  width: 100%;
`;

const Brand = styled.div`
  align-items: center;
  display: flex;
  height: 80%;

  img {
    height: 40px;
  }

  span {
    font-family: 'Roboto Slab', 'sans-serif';
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-left: 15px;
  }

  @media (min-width: 800px) {
    font-size: 24px;
  }
`;

const Nav = styled.nav`
  ul {
    align-items: center;
    display: flex;
    list-style: none;
    li {
      margin-left: 20px;
    }
  }
  a {
    align-items: center;
    display: flex;
    height: 30px;
    padding: 5px 10px 7px;
    position: relative;
    &:after {
      background-color: #43a7ff;
      bottom: -4px;
      content: '';
      display: block;
      height: 3px;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      transition: width 200ms ease-out;
      width: 0;
    }
  }
  .active {
    &:after {
      width: 100%;
    }
  }

  .profile-link {
    img {
      margin-right: 10px;
    }
  }
`;

export default props => (
  <Header>
    <Container>
      <Link to="/">
        <Brand>
          <img src={logo} alt="GCP Logo" />
          <span>The Marketplace</span>
        </Brand>
      </Link>
      <Nav>
        <ul>
          <li>
            <NavLink to="/profiles">Browse Profiles</NavLink>
          </li>
          <li>
            {/* <NavLink to="/auth">Login</NavLink> */}
            <NavLink to="/profile/1" className="profile-link">
              <img src={userImage} height="36" alt="" />
              <span>My Profile</span>
            </NavLink>
          </li>
        </ul>
      </Nav>
    </Container>
  </Header>
);
