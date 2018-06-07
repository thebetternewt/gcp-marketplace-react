import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tag from '../common/Tag';
import ProfileImage from './ProfileImage';

const Profile = props => {
  // const profile = profiles[0];

  // const { categories } = profile;

  // const categoryTags = categories.map((cat, index) => (
  //   <Tag key={index} bgColor="yellow" text={cat} className="tag" />
  // ));

  const { name, bio, imgUrl } = props.profile;

  return (
    <ProfileLayout>
      <div className="col-1">
        <ProfileImage imgUrl={imgUrl} size="200px" />
        <h3 className="name">{name}</h3>
        <SocialLinks>
          <ul>
            <li>
              <i className="fab fa-twitter" />
            </li>
            <li>
              <i className="fab fa-facebook " />
            </li>
            <li>
              <i className="fab fa-linkedin " />
            </li>
            <li>
              <i className="fab fa-instagram " />
            </li>
          </ul>
        </SocialLinks>
        <Categories>
          <span className="label">Focused on:</span>
          {/* {categoryTags} */}
        </Categories>
      </div>
      <div className="col-2">
        <div className="bio">
          <h4>Bio:</h4>
          <p>{bio || `${name} doesn't have a bio yet.`}</p>
        </div>

        <Skills>
          <span className="label">Skills:</span>
          {/* {categoryTags} */}
        </Skills>
        <Contributions>
          <h4>Contributions:</h4>
          <p>COMING SOON!</p>
        </Contributions>
      </div>
    </ProfileLayout>
  );
};

Profile.propTypes = {
  profile: PropTypes.shape().isRequired
};

export default Profile;

const ProfileLayout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 25px 0;
  width: 100%;

  .col-1,
  .col-2 {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .name {
    font-family: 'Montserrat', 'Helvetica', Arial, sans-serif;
    font-size: 1.3rem;
    margin: 0.9em 0 0.5em;
    text-align: center;
    text-transform: uppercase;
  }

  .bio {
    background-color: #e1eaf2;
    box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
    min-height: 200px;
    padding: 0 15px;
  }

  @media (min-width: 800px) {
    align-items: flex-start;
    flex-direction: row;

    .col-1 {
      width: 200px;
    }
    .col-2 {
      margin-left: 20px;
    }
  }
`;

const Skills = styled.div`
  background-color: #e1eaf2;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  margin-top: 15px;
  padding: 15px;

  .label {
    font-weight: 600;
    margin: 10px 15px 15px 0;
  }
`;

const Categories = styled.div`
  background-color: #e1eaf2;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  margin: 25px 0;
  padding: 15px;

  .label {
    font-weight: 600;
    margin-right: 15px;
  }

  @media (min-width: 800px) {
    .label {
      display: block;
      margin-bottom: 15px;
    }
  }
`;

const SocialLinks = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    list-style: none;
    margin: 0 auto;
    max-width: 200px;
    padding: 0;

    li {
      align-items: center;
      background-color: #e1eaf2;
      border-radius: 99px;
      box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
      display: flex;
      font-size: 20px;
      height: 40px;
      justify-content: center;
      width: 40px;
    }
  }
`;

const Contributions = styled.div`
  background-color: #e1eaf2;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
  margin: 15px 0;
  min-height: 300px;
  padding: 0 15px;
`;
