import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Container from '../common/ContentContainer';
import Hero from './Hero';

import cityImage from '../../images/buildings-city-community.jpg';
import marketplaceLogo from '../../images/gcp_marketplace_logo.png';

const HomePage = styled.div`
  background-color: #fff;
  font-family: 'EB Garamond';
  font-size: 1.2rem;

  h2 {
    font-family: 'Montserrat', 'Helvetica', Arial, sans-serif;
    font-size: 2.1rem;
    font-weight: 300;
    margin: 1em 0 0.5em;
    text-align: center;
    text-transform: uppercase;
  }
  h5 {
    opacity: 0.6;
    font-family: 'Montserrat', 'Helvetica', Arial, sans-serif;
    font-size: 1.1rem;
    font-weight: 300;
    font-style: italic;
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

const Section = styled.div`
  ${props =>
    props.dark
      ? 'background-color: #333; color: #fff'
      : 'background-color: #fff; color: #111'};
  width: 100vw;
  padding: 1rem 0;
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
    <Section>
      <Container>
        <h2>Our Heart For The “Creative” Innovator</h2>
        {/* <h5>Training the Next Generation in the Arts</h5> */}
        <p>
          We want to help train, equip, and resource the next generation of
          believers in all forms of creativity. We want to see the local family
          and church become the cultivator of all culture once again in the
          arts/media, governance, education, the home, the church, and business.
          We want to share your god-glorifying work that is done locally with
          those in the global body of christ. By you simply creating a free
          profile, we can connect you to a host of creatives in god’s global
          family, who are excellent in Christlikeness, character, and craft.
          And, more specifically, if you have a talent, a skill, a project, or
          work you'd like to promote, contribute, or share with the community in
          order to make it available to the body of christ, you can! Let the fun
          networking possibilities begin.
        </p>
      </Container>
    </Section>
    <Section dark>
      <Container>
        <h2>Connecting Small Ideas With Big Resources</h2>
        <h5>
          We have found some of the most inspiring kingdom ideas in some of the
          most remote places.
        </h5>
        <p>
          We realize that start-up ideas in any form often lack the resourcing
          of notable industry services and professionals to get things started.
          We realize that ideas that are particularly helpful to building up the
          local church in worship and mission are even more difficult to
          resource.
        </p>
        <p>
          We’ve assembled all the resources one might need for publication,
          production, and promotion into one central place. Our goal is to serve
          ideas and believers that have ideas that will build up and mature the
          Body of Christ.
        </p>
        <p>
          By networking with local churches to help build up the Body of Christ
          for the benefit of local communities, we are able to cut industry
          costs by up to 80%, and still fully resource your idea for the good of
          God’s kingdom. We do this through network partners and through
          charging you a small monthly fee in order to offset all the other
          costs.
        </p>
      </Container>
    </Section>
    <Section>
      <Container>
        <h2>Pricing That Helps Lower Your Costs</h2>
        <h5>
          By paying a simple monthly fee, you can see below how we can instantly
          start to grant your work incredible resourcing for far less.
        </h5>
        <p>
          Everyone of our partners gives something to Garden City in order to
          enable our artists, innovators, and creatives to work their ideas into
          practical and thoughtful methods of building up the church in worship
          and mission. If your work or entity can offer services to our network
          that can help empower those in our sphere of influence, tell us about
          it HERE, and we'd love to promote your work as well.
        </p>
      </Container>
    </Section>
    <Section dark>
      <Container>
        <h2>In Our Marketplace You Can . . . </h2>
        <p>
          We realize that start-up ideas in any form often lack the resourcing
          of notable industry services and professionals to get things started.
          We realize that ideas that are particularly helpful to building up the
          local church in worship and mission are even more difficult to
          resource.
        </p>
      </Container>
    </Section>
    <Section />
  </HomePage>
);

const HeroImage = styled.img`
  width: 80%;
  max-width: 400px;
  margin-bottom: 2rem;
`;
