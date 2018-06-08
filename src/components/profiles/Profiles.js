import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { H1 } from '../UI';
import ContentContainer from '../common/ContentContainer';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../store/actions/profileActions';
import Spinner from '../common/Spinner';
// import profiles from '../../data/profiles';

class Profiles extends Component {
  componentDidMount = () => {
    this.props.getProfiles();
  };

  render() {
    const { loading, profiles } = this.props;

    let profileItems;
    if (loading) {
      profileItems = <Spinner />;
    } else {
      profileItems = profiles.map(profile => (
        <ProfileItem key={profile.user} profile={profile} />
      ));
    }

    return (
      <ContentContainer align="flex-start">
        <H1>Browse Profiles</H1>
        <SearchInput type="text" placeholder="Type to start searching..." />
        {profileItems}
      </ContentContainer>
    );
  }
}

Profiles.propTypes = {
  loading: PropTypes.bool.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.profile.loading,
  profiles: state.profile.profiles
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);

const SearchInput = styled.input`
  align-self: center;
  outline: 2px solid #aaa;
  border: none;
  font-size: 1rem;

  height: 40px;
  margin: 1rem 0;
  padding: 5px 15px;
  width: 100%;
  max-width: 400px;
`;
