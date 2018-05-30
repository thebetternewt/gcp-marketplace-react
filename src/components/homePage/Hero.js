import React from 'react';
import styled from 'styled-components';

const Hero = styled.div`
  background-image: url('${props => props.backgroundImage}');
  background-position: center bottom;
  background-size: cover;
  display: flex;
  height: 70vh;
  justify-content: center;
  max-height: 600px;
  min-height: 300px;
  position: relative;
  text-align: center;
  width: 100vw;

  h1 {
    color: #fff;
    font-family: 'Roboto Slab', 'sans-serif';
    font-size: 3rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }


`;

const Filter = styled.div`
  background-color: rgba(70, 129, 181, 0.7);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const ContentContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  width: 100%;
  z-index: 2;
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
    color: rgb(61, 153, 145);
  }
`;

export default props => (
  <Hero backgroundImage={props.backgroundImage}>
    <Filter />
    <ContentContainer>
      {props.children}
      <ActionButton>
        Create Your Profile <i className="far fa-chevron-circle-right fa-lg" />
      </ActionButton>
    </ContentContainer>
  </Hero>
);
