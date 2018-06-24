import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '../common/ContentContainer';
import Profile from './Profile';
import Spinner from '../common/Spinner';
import NotFound from './NotFound';

import { getProfileByHandle } from '../../store/actions/profileActions';

class ProfilePage extends Component {
  componentDidMount = () => {
    this.props.getProfileByHandle(this.props.match.params.handle);
  };

  render() {
    const { loading, profile } = this.props.profile;

    if (loading) {
      return <Spinner />;
    }

    return (
      <Container>
        {profile ? (
          <Fragment>
            <Helmet>
              <meta charSet="utf-8" />
              <title>{profile.name} | The Marketplace</title>
              <meta
                name="description"
                content={`${profile.name} - ${profile.bio}`}
              />
            </Helmet>
            <Profile profile={profile} />
          </Fragment>
        ) : (
          <NotFound />
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
