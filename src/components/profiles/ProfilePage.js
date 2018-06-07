import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '../common/ContentContainer';
import Profile from './Profile';
import Spinner from '../common/Spinner';
import { Box, Button } from '../UI';
import { getProfileByHandle } from '../../store/actions/profileActions';

class ProfilePage extends Component {
  componentDidMount = () => {
    this.props.getProfileByHandle(this.props.match.params.handle);
  };

  // componentWillReceiveProps = nextProps => {
  //   if (nextProps.profile.profile === null && this.props.profile.loading) {
  //     this.props.history.push('/not-found');
  //   }
  // };

  render() {
    const { loading, profile } = this.props.profile;

    if (loading) {
      return <Spinner />;
    }

    return (
      <Container>
        {profile ? (
          <Profile profile={profile} />
        ) : (
          <Box>
            <h3>No Profile Found</h3>
            <Link to="/profiles">
              <Button>Back to Profiles</Button>
            </Link>
          </Box>
        )}
      </Container>
    );
  }
}

ProfilePage.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(ProfilePage);
