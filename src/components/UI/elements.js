import styled from 'styled-components';

export const Box = styled.div`
  background-color: #e1eaf2;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  margin: ${props => props.margin || '15px 0'};
  padding: ${props => props.padding || '15px'};
  width: 100%;
`;

export const Button = styled.button`
  color: #fff;
  background-color: rgb(70, 129, 181);
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 0;
  font-family: 'Montserrat', helvetica, arial, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.8em 1.5em;
  text-transform: uppercase;
  transition: all 100ms ease-out;
  cursor: pointer;

  &:hover, &:active {
    color: rgb(70, 129, 181);
    background-color: #fff;
    outline 3px solid rgb(70, 129, 181);
  }
`;
