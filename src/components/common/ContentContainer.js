import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
  align-items: ${props => props.align || 'center'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 800px;
  padding: 0 15px;
  width: 100%;
  z-index: 2;
`;

export default props => (
  <ContentContainer align={props.align}>{props.children}</ContentContainer>
);
