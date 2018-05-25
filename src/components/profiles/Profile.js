import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ContentContainer from '../common/ContentContainer';
import Tag from '../common/Tag';

import userImage from '../../images/user.png';
import profiles from '../../data/profiles';

const Profile = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 25px 0;
  width: 100%;

  .col-1 {
    /* align-items: center; */
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .col-2 {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .profile-image {
    align-self: center;
    background-color: #777;
    border-radius: 999px;
    box-shadow: 2px 3px 12px rgba(0, 0, 0, 0.2);
    height: 200px;
    width: 200px;

    img {
      width: 100%;
    }
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

export default class ProfilePage extends Component {
  render() {
    console.log(this.props.match.params.id);
    const profile = profiles[this.props.match.params.id - 1];

    const { name, bio, categories } = profile;

    const categoryTags = categories.map((cat, index) => (
      <Tag key={index} bgColor="yellow" text={cat} className="tag" />
    ));

    return (
      <ContentContainer>
        <Profile>
          <div className="col-1">
            <div className="profile-image">
              <img src={this.props.profileImage} alt="Profile Image" />
            </div>
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
              {categoryTags}
            </Categories>
          </div>
          <div className="col-2">
            <div className="bio">
              <h4>Bio:</h4>
              <p>{bio.long || `${name} doesn't have a bio yet.`}</p>
            </div>

            <Skills>
              <span className="label">Skills:</span>
              {categoryTags}
            </Skills>
            <Contributions>
              <h4>Contributions:</h4>
              <p>COMING SOON!</p>
            </Contributions>
          </div>
        </Profile>
      </ContentContainer>
    );
  }
}

ProfilePage.defaultProps = {
  profileImage: userImage
};
