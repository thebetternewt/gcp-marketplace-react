import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Box, Button, H1 } from '../UI';

import ContentContainer from '../common/ContentContainer';
import Spinner from '../common/Spinner';
import Profile from './Profile';

import { getCurrentProfile } from '../../store/actions/profileActions';

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    const { user, profile } = this.props;
    const firstName = user.name && user.name.split(' ')[0];

    return (
      <ContentContainer>
        <Box padding="15px">
          <H1 style={{ marginTop: '15px' }}>Welcome, {firstName}!</H1>
          {!profile && (
            <Fragment>
              <p>You do not have a profile... yet!</p>
              <Link to="/create-profile">
                <Button>Create Profile</Button>
              </Link>
            </Fragment>
          )}
        </Box>
        {profile && <Profile profile={profile} />}
      </ContentContainer>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.shape().isRequired,
  profile: PropTypes.shape(),
  loading: PropTypes.bool.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

Dashboard.defaultProps = {
  profile: null
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile.profile,
  loading: state.auth.loading || state.profile.loading
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
