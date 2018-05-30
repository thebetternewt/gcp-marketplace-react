import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ContentContainer from '../common/ContentContainer';
import Hero from './Hero';

import cityImage from '../../images/buildings-city-community.jpg';
import marketplaceLogo from '../../images/gcp_marketplace_logo.png';

const HomePage = styled.div`
  background-color: #fff;
  font-family: 'EB Garamond';
  font-size: 1.2rem;

  h2 {
    font-family: 'Montserrat', 'Helvetica', Arial, sans-serif;
    font-size: 2.3rem;
    font-weight: 300;
    margin: 1em 0 0.5em;
    text-align: center;
    text-transform: uppercase;
  }
  h5 {
    font-family: 'Montserrat', 'Helvetica', Arial, sans-serif;
    font-size: 1.3rem;
    font-weight: 300;
    margin: 1em 0;
    text-align: center;
    text-transform: uppercase;
  }
`;

const ActionButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 3px solid #fff;
  border-radius: 100px;
  display: flex;
  color: #fff;
  cursor: pointer;
  font-family: 'Montserrat', helvetica, arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.8em 1.5em;
  text-transform: uppercase;
  transition: all 200ms ease-out;

  i {
    margin-left: 8px;
  }

  &:hover,
  &:active,
  &:focus {
    background-color: #fff;
    color: rgb(70, 129, 181);
  }
`;

export default () => (
  <HomePage>
    <Hero backgroundImage={cityImage}>
      <HeroImage src={marketplaceLogo} alt="The Marketplace" />
      <Link to="/signup">
        <ActionButton>
          Join Today <i className="far fa-chevron-circle-right fa-lg" />
        </ActionButton>
      </Link>
    </Hero>
    <ContentContainer>
      <h2>Teachers</h2>
      <h5>Training the Next Generation in the Arts</h5>
      <p>
        Our Marketplace teachers are seen globally but they serve locally. Here,
        you can connect to background certified teachers in a family safe
        environment for something as simple as one-on-one lessons, or if you're
        a teacher, you can join us, our T.V. network, and our platform, to share
        what you know with the world.
      </p>
      <h2>Innovators</h2>
      <h5>
        God-Glorifying work that is done locally that we share and network
        globally
      </h5>
      <p>
        Our Marketplace innovators are seen globally, but they serve locally.
        Here, you can connect to a host of creatives, who are excellent in
        Christlikeness, character, and craft, in order to get what you need
        done, DONE! Or, if you have a talent, a skill, a project, or work you'd
        like to promote and make available to the Body of Christ, you can fill
        out THIS FORM and be seen in our network, and beyond.
      </p>
      <h2>Partners</h2>
      <h5>Our Partners Work Locally to REACH Globally</h5>
      <p>
        Everyone of our partners gives something to Garden City in order to
        enable our artists, innovators, and creatives to work their ideas into
        practical and thoughtful methods of building up the church in worship
        and mission. If your work or entity can offer services to our network
        that can help empower those in our sphere of influence, tell us about it
        HERE, and we'd love to promote your work as well.
      </p>
    </ContentContainer>
  </HomePage>
);

const HeroImage = styled.img`
  width: 80%;
  max-width: 400px;
  margin-bottom: 2rem;
`;
