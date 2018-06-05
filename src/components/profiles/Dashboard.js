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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user) {
      return { loading: false };
    }
    return this.state;
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }

    const { user } = this.props;

    return (
      <ContentContainer>
        <Box padding="15px">
          <h2>Welcome, {user.displayName}!</h2>
          <p>You don't have a profile... yet!</p>
          <Link to="/create-profile">
            <Button>Create Profile</Button>
          </Link>
        </Box>
        <Profile
          profileImage={user.photoUrl || userPlaceholder}
          name={user.name}
        />
      </ContentContainer>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.shape()
};

Dashboard.defaultProps = {
  user: null
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);
