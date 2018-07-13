import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tag from '../common/Tag';
import { Box, COOL_WHITE } from '../UI';
import ProfileImage from './ProfileImage';

const Profile = props => {
  // const { categories } = profile;

  const categories = ['Web Development', 'Graphic Design', 'Programming', 'A Fourth Skill'];

  const categoryTags = categories.map((cat, index) => (
    <Tag key={index} bgColor="yellow" text={cat} className="tag" />
  ));

  const { name, bio, imgUrl, skills, facebook, instagram, twitter, linkedin } = props.profile;

  let skillTags;

  if (skills) {
    skillTags = skills
      .split(',')
      .map((skill, index) => (
        <Tag key={index} bgColor="lightgreen" text={skill.trim()} className="tag" />
      ));
  }

  return (
    <ProfileLayout>
      <div className="col-1">
        <ProfileImage imgUrl={imgUrl} size="200px" />
        <Name>{name}</Name>
        <SocialLinks>
          <ul>
            {twitter && (
              <li>
                <i className="fab fa-twitter" />
              </li>
            )}
            {facebook && (
              <li>
                <i className="fab fa-facebook " />
              </li>
            )}
            {linkedin && (
              <li>
                <i className="fab fa-linkedin " />
              </li>
            )}
            {instagram && (
              <li>
                <i className="fab fa-instagram " />
              </li>
            )}
          </ul>
        </SocialLinks>
        <Categories>
          <span className="label">Focused on:</span>
          {categoryTags}
        </Categories>
      </div>
      <div className="col-2">
        <Bio>
          {/* <div className="bio"> */}
          <h4>Bio:</h4>
          <p>{bio || `${name} doesn't have a bio yet.`}</p>
          {/* </div> */}
        </Bio>

        <Skills>
          <span className="label">Skills:</span>
          {skillTags}
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

const Name = styled.h3`
  font-family: 'Montserrat', 'Helvetica', Arial, sans-serif;
  font-size: 1.3rem;
  margin: 0.9em 0 0.5em;
  text-align: center;
  text-transform: uppercase;
`;

const Bio = styled(Box)`
  margin-top: 0;
  min-height: 200px;

  h4 {
    margin-top: 5px;
  }
`;

const Skills = styled(Box)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 0;

  .label {
    font-weight: 600;
    margin-right: 15px;
  }
`;

const Categories = styled(Box)`
  .label {
    font-weight: 600;
    display: block;
    margin-top: 5px;
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
    justify-content: center;
    list-style: none;
    margin: 0 auto;
    max-width: 200px;
    padding: 0;
    width: 100%;

    li {
      align-items: center;
      background-color: ${COOL_WHITE};
      border-radius: 99px;
      box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
      display: flex;
      font-size: 20px;
      height: 40px;
      margin-right: 10px;
      justify-content: center;
      width: 40px;
    }

    li:last-child {
      margin-right: 0px;
    }
  }
`;

const Contributions = styled(Box)`
  min-height: 300px;

  h4 {
    margin-top: 5px;
  }
`;
