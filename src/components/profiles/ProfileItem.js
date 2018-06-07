import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Tag from '../common/Tag';

const ProfileItem = styled.div`
  background-color: #fff;
  box-shadow: 3px 3px 10px rgba(160, 164, 170, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0;
  padding: 15px;
  text-align: left;
  width: 100%;

  h3 {
    margin-bottom: 1rem;
  }

  p {
    margin: 0;
  }

  .tags {
    margin: 1rem 0;
  }

  button {
    background-color: transparent;
    color: blue;
    border: 2px solid blue;
    font-family: 'Montserrat', helvetica, arial, sans-serif;
    font-size: 16px;
    padding: 5px;
  }

  @media (min-width: 800px) {
    align-items: center;
    flex-direction: row;
  }
`;

export default props => {
  const { handle, name, bio } = props.profile;
  // Temp var:
  const categories = ['Songwriting', 'Music production', 'Animation'];
  const categoryTags = categories.map(cat => (
    <Tag key={cat} bgColor="lightGreen" text={cat.trim()} />
  ));
  return (
    <ProfileItem>
      <div>
        <h3>{name}</h3>
        <p>{bio.short}</p>
        <p className="tags">{categoryTags}</p>
      </div>
      <Link to={`/profile/${handle}`}>
        <button>View Profile</button>
      </Link>
    </ProfileItem>
  );
};
