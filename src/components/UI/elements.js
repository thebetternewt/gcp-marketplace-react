import React from 'react';
import styled from 'styled-components';
import { COOL_WHITE, PRIMARY_BLUE } from './colors';

export const Box = styled.div`
  border-radius: 7px;
  background-color: ${COOL_WHITE};
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  margin: ${props => props.margin || '15px 0'};
  padding: ${props => props.padding || '15px'};
  width: 100%;
`;

export const Button = styled.button`
  color: #fff;
  background-color: ${PRIMARY_BLUE};
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 0;
  font-family: 'Montserrat', helvetica, arial, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.8em 1.5em;
  margin-right: 15px;
  text-transform: uppercase;
  transition: all 100ms ease-out;
  cursor: pointer;

  &:hover, &:active {
    color: ${PRIMARY_BLUE};
    background-color: #fff;
    outline 3px solid ${PRIMARY_BLUE};
  }

  ${props =>
    props.danger &&
    `
    background-color: darkred;

    &:hover, &:active {
    color: darkred;
    background-color: #fff;
    outline 3px solid darkred;
  }
  `}
`;

// TEXT

export const H1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  margin-top: 1em;
  align-self: center;
`;

// FORMS
export const Label = styled.label`
  display: block;
  color: #333;
  font-size: 1.2em;
  padding: 1rem 0 0.5rem;
`;

export const Input = styled.input`
  display: block;
  border: none;
  outline: 2px solid #ddd;
  font-size: 1em;
  max-width: 400px;
  width: 100%;
  padding: 10px;
`;

export const InputCounter = props => {
  const Counter = styled.p`
    display: block;
    color: ${({ data, maxLength }) => {
      return data.length > maxLength ? 'red' : '#777';
    }};
    text-align: right;
  `;

  const { data, maxLength } = props;
  return (
    <Counter data={data} maxLength={maxLength}>
      {data.length}/{maxLength}
    </Counter>
  );
};

export const InputInfo = styled.p`
  font-size: 0.8em;
  opacity: 0.6;
`;

export const TextArea = styled.textarea`
  display: block;
  border: none;
  outline: 2px solid #ddd;
  font-size: 1em;
  min-width: 100%;
  height: 100px;
  padding: 10px;
  font-family: inherit;
`;

export const ErrorMessage = styled.p`
  color: red;
`;
