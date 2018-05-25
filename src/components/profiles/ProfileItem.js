import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Tag from '../common/Tag';

const ProfileItem = styled.div`
  align-items: center;
  background-color: #fff;
  /* border: 1px solid rgba(160, 164, 170, 0.); */
  box-shadow: 3px 3px 10px rgba(160, 164, 170, 0.9);
  display: flex;
  justify-content: space-between;
  margin: 15px;
  padding: 10px;
  text-align: left;

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
`;

export default props => {
  const { id, name, bio, categories } = props.profile;
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
      <Link to={`/profile/${id}`}>
        <button>View Profile</button>
      </Link>
    </ProfileItem>
  );
};
