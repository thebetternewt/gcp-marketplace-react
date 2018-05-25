import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../../images/logos/gcp-logo-white.png';

const Footer = styled.div`
  background-color: #333;
  box-shadow: 0 3px 12px rgba(100, 100, 100, 0.7);
  display: flex;
  /* height: 60px; */
  justify-content: center;
  max-width: 100vw;
  padding: 20px 0;
  width: 100%;

  img {
    width: 100px;
  }
`;

const Container = styled.div`
  align-items: center;
  color: #fff;
  display: flex;
  height: 100%;
  justify-content: center;
  max-width: 1200px;
  padding: 0 15px;
  text-align: center;
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
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-left: 15px;
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    li {
      margin-left: 20px;
    }
  }
  a {
    padding-bottom: 5px;
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
`;

export default props => (
  <Footer>
    <Container>
      <Link to="/">
        <img src={logo} alt="gcp-logo" />
        <p>
          <i className="fal fa-copyright" /> {new Date().getFullYear()} Garden
          City Project
        </p>
      </Link>
      {/* <Nav>
        <ul>
          <li>
            <NavLink to="/profiles">Browse Profiles</NavLink>
          </li>
          <li>
            <NavLink to="/auth">Login</NavLink>
          </li>
        </ul>
      </Nav> */}
    </Container>
  </Footer>
);
