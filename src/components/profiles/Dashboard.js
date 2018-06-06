import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Box, Button } from '../UI';

import ContentContainer from '../common/ContentContainer';
import Spinner from '../common/Spinner';
import Profile from './Profile';

import userPlaceholder from '../../images/user.png';

class Dashboard extends Component {
  state = {
    loading: true
  };

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    const { user, profile } = this.props;

    return (
      <ContentContainer>
        <Box padding="15px">
          <h2>Welcome, {user.displayName}!</h2>
          <p>You don't have a profile... yet!</p>
          <Link to="/create-profile">
            <Button>Create Profile</Button>
          </Link>
        </Box>
        {profile && (
          <Profile
            profileImage={user.photoUrl || userPlaceholder}
            name={user.name}
          />
        )}
      </ContentContainer>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(Dashboard);
