import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 800px;
  padding: 0 15px;
  z-index: 2;
`;

export default props => <ContentContainer>{props.children}</ContentContainer>;
